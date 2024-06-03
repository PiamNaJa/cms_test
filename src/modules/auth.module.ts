import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthRepository } from 'src/repository/auth.repository';
import { AuthService } from 'src/services/auth.service';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository],
})
export class AuthModule { }
