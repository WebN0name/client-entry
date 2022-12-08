import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreateDoctorDTO } from 'src/dto/doctor.dto';
import { BaseError } from 'src/helpers';
import { DoctorDocument, DoctorSchemaAlias } from 'src/schemas/doctor.schema';

@Injectable()
export class DoctorService {
    constructor(
        @InjectModel(DoctorSchemaAlias) private _doctorModel: PaginateModel<DoctorDocument>
    ) { }

    async createDoctor(doctor: CreateDoctorDTO) {
        try {
            doctor.slots.map((item) => {
                return new Date(new Date(item).toUTCString()).getTime()
            })
            const newDoctor = new this._doctorModel({ ...doctor })
            await newDoctor.save()
            return { status: true }
        } catch (error) {
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllDoctrors(limit: number, offset: number) {
        try {
            const doctors = await this._doctorModel.paginate({}, { offset, limit })
            return doctors
        } catch (error) {
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async isDoctor(_id) {
        try {
            const isExist = await this._doctorModel.findOne({ _id })
            if (!isExist) throw new BaseError(`doctor with this id: ${String(_id)} not found`, HttpStatus.NOT_FOUND)

            return isExist
        } catch (error) {
            if (error.statusCode) {
                throw new BaseError(error.message, error.statusCode);
            }
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
