import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { UserResDto } from 'src/dto/auth.dto';
import { PaymentDto } from 'src/dto/payment.dto';
import { Transaction } from 'src/entities/transaction.entity';
import { User } from 'src/entities/user.entity';
import { AuthRepository } from 'src/repository/auth.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly dataSource: DataSource,
        private readonly jwtService: JwtService
    ) { }

    async getUser(token: string): Promise<{ data: UserResDto; }> {
        const payload: UserResDto = await this.jwtService.verify(token);
        const user = await this.authRepository.findOneBy({ userId: payload.userId });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return { data: plainToClass(UserResDto, user) };
    }

    async deposit(token: string, paymentDto: PaymentDto): Promise<{ message: string; }> {
        const payload: UserResDto = await this.jwtService.verify(token);
        const user = await this.authRepository.findOne({ where: { userId: payload.userId }, relations: ['transactions'] });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const { amount } = paymentDto;
        user.money += amount;

        const entityManager = this.dataSource.createEntityManager();
        entityManager.transaction(async em => {
            const newTransaction = { desc: 'Deposit', user, amount: `+${amount}` } as Transaction;
            const savedTransaction = await em.save(Transaction, newTransaction);
            user.transactions.push(savedTransaction);
            await em.save(User, user);
        });
        return { message: 'Deposit success' };
    }

    async withdraw(token: string, paymentDto: PaymentDto, desc: string = 'Withdraw'): Promise<{ message: string; }> {
        const payload: UserResDto = await this.jwtService.verify(token);
        const user = await this.authRepository.findOne({ where: { userId: payload.userId }, relations: ['transactions'] });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const { amount } = paymentDto;

        if (user.money < amount) {
            throw new BadRequestException('Insufficient balance');
        }

        user.money -= amount;
        const entityManager = this.dataSource.createEntityManager();
        entityManager.transaction(async em => {
            const newTransaction = { desc, user, amount: `-${amount}` } as Transaction;
            const savedTransaction = await em.save(Transaction, newTransaction);
            user.transactions.push(savedTransaction);
            await em.save(User, user);
        });
        return { message: 'Withdraw success' };
    }

    async payment(token: string, paymentDto: PaymentDto) {
        await this.withdraw(token, paymentDto, 'Payment');
        return { message: 'Payment success' };
    }
}
