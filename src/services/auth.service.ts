import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from 'src/dto/auth.dto';
import { AuthRepository } from 'src/repository/auth.repository';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto): Promise<{ token: string; }> {
        const { username, password } = loginDto;
        const user = await this.authRepository.findOne({ where: { username } });
        if (!user) {
            throw new UnauthorizedException('User not found!');
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            throw new UnauthorizedException('Invalid password!');
        }
        return { token: this.jwtService.sign({ userId: user.userId, username }) };
    }

    async register(registerDto: RegisterDto): Promise<{ token: string; }> {
        const { username, password } = registerDto;
        const user = await this.authRepository.findOne({ where: { username } });
        if (user) {
            throw new UnauthorizedException('User already exists!');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.authRepository.save({ ...registerDto, password: hashedPassword });
        return { token: this.jwtService.sign({ userId: newUser.userId, username }) };
    }
}
