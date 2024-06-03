import { Body, Controller, Get, Headers, Patch, UseGuards, ValidationPipe } from '@nestjs/common';
import { PaymentDto } from 'src/dto/payment.dto';
import { TokenGuard } from 'src/guards/auth.guard';
import { UserService } from 'src/services/user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/user')
    @UseGuards(TokenGuard)
    async GetUser(@Headers('token') token: string) {
        return await this.userService.getUser(token);
    }

    @Patch('/user/deposit')
    @UseGuards(TokenGuard)
    async Deposit(@Headers('token') token: string, @Body(new ValidationPipe()) paymentDto: PaymentDto) {
        return await this.userService.deposit(token, paymentDto);
    }

    @Patch('/user/withdraw')
    @UseGuards(TokenGuard)
    async WithDraw(@Headers('token') token: string, @Body(new ValidationPipe()) paymentDto: PaymentDto) {
        return await this.userService.withdraw(token, paymentDto);
    }

    @Patch('/user/payment')
    @UseGuards(TokenGuard)
    async Payment(@Headers('token') token: string, @Body(new ValidationPipe()) paymentDto: PaymentDto) {
        return await this.userService.payment(token, paymentDto);
    }
}
