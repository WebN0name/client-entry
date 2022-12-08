import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString, MinLength, IsArray, IsNumber } from "class-validator";

export class CreateDoctorDTO{
    @ApiProperty({example: 'Vladimir'})
    @IsString()
    @MinLength(2)
    firstName: string

    @ApiProperty({example: 'Stroyev'})
    @IsString()
    @MinLength(2)
    lastName: string

    @ApiProperty({example: 'therapist'})
    @IsIn(['therapist', 'surgeon', 'ENT doctor', 'dentist'])
    spec: string

    @ApiProperty({type: 'array', items: {type: 'number'}, example: [1670752800000, 1670754600000, 1670756400000, 1670758200000]})
    @IsNumber({},{each: true})
    slots: number[]
}