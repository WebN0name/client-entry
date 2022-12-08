import { Body, Controller, Post, HttpStatus, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateDoctorDTO } from 'src/dto/doctor.dto';
import { PaginateDto } from 'src/dto/paginate.dto';
import { BaseError } from 'src/helpers';
import { DoctorService } from './doctor.service';

@Controller('doctor')
@ApiTags('Doctor')
export class DoctorController {
    constructor(
        private readonly _doctorService: DoctorService
    ){}
    @Post('create')
    async createDoctor(@Body() doctor: CreateDoctorDTO){
        try {
            const result = await this._doctorService.createDoctor(doctor)
            return result
        } catch (error) {
            if (error.statusCode) {
                throw new BaseError(error.message, error.statusCode);
            }
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    @Get()
    async getManyDoctors(
        @Query() { limit, offset }: PaginateDto,
    ){
        try {
            const result = await this._doctorService.getAllDoctrors(limit, offset)

            return result
        } catch (error) {
            if (error.statusCode) {
                throw new BaseError(error.message, error.statusCode);
            }
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }
}
