import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';
import { Transaction } from 'src/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3305,
    username: 'root',
    password: 'root',
    database: 'cms',
    entities: [User, Transaction],
    synchronize: true,
  }),
  JwtModule.register({
    global: true,
    secret: 'JRPw81y4hzBzpmaKythcKw==',
    signOptions: { expiresIn: '1d' },
  }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
