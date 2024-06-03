import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { AuthRepository } from 'src/repository/auth.repository';
import { TransactionRepository } from 'src/repository/transaction.repository';
import { UserService } from 'src/services/user.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, AuthRepository, TransactionRepository],
})
export class UserModule { }
