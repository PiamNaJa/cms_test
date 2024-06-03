import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class PaymentDto {
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @ApiProperty({
        default: 20
    })
    amount: number;
}