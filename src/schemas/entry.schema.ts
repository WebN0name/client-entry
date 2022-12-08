import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type EntryDocument = HydratedDocument<Entry>

@Schema()
export class Entry {
    @Prop({index: true,  type: mongoose.SchemaTypes.ObjectId})
    clientId: ObjectId

    @Prop({ index: true, type: mongoose.SchemaTypes.ObjectId})
    doctorId: ObjectId

    @Prop({index: true})
    dateTime: number
}

export const EntrySchema = SchemaFactory.createForClass(Entry).plugin(mongoosePaginate)

export const EntrySchemaAlias = 'entry'