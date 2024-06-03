import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        default: 'book'
    })
    username: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        default: 'test'
    })
    password: string;
}

export class RegisterDto extends LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        default: 'Abc'
    })
    firstname: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        default: 'Efg'
    })
    lastname: string;
}

export class UserResDto {
    constructor(partial: Partial<UserResDto>) {
        Object.assign(this, partial);
    }

    @Expose()
    userId: number;

    @Expose()
    username: string;

    @Expose()
    firstname: string;

    @Expose()
    lastname: string;

    @Exclude()
    password: string;
}