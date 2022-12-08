import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type ClientDocument = HydratedDocument<Client>


@Schema()
export class Client {
    @Prop({index: true, unique: true})
    phone: string

    @Prop()
    firstName: string

    @Prop()
    lastName: string
}

export const ClientSchema = SchemaFactory.createForClass(Client).plugin(mongoosePaginate)

export const ClientSchemaAlias = 'client'