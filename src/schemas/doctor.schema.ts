import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type DoctorDocument = HydratedDocument<Doctor>


@Schema()
export class Doctor {
    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop()
    spec: string

    @Prop()
    slots: number[]
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor).plugin(mongoosePaginate)

export const DoctorSchemaAlias = 'doctor'