import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class PaginateDto {
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @ApiProperty()
    offset: number;
  
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @ApiProperty()
    limit: number;
  }