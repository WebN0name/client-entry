import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString, IsNumber } from "class-validator";

export class CreateEntryDTO{

    @ApiProperty()
    @IsString()
    @IsMongoId()
    clientId: string

    @ApiProperty()
    @IsString()
    @IsMongoId()
    doctorId: string

    @ApiProperty()
    @IsNumber()
    dateTime: number
}