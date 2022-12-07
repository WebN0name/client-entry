import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsOptional, IsString, Matches, MinLength } from "class-validator";

const mobileNumberRegex = /^(\+[0-9]{1,3}[- ]?)?[0-9]{9,10}$/;

export class CreateClientDTO{
    @ApiProperty({example: '+79539214739'})
    @IsMobilePhone()
    @MinLength(12, {message: 'phone number is too short'})
    @Matches(mobileNumberRegex, {message: 'phone number is not valid'})
    @IsString()
    phone: string

    @ApiProperty({example: 'Vladimir'})
    @IsString()
    @MinLength(2)
    firstName: string

    @ApiProperty({example: 'Stroyev'})
    @IsString()
    @MinLength(2)
    lastName: string
}