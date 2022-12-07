import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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

export const ClientSchema = SchemaFactory.createForClass(Client)

export const ClientSchemaAlias = 'client'