import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type NotificationDocument = HydratedDocument<Notification>

@Schema()
export class  Notification {
    @Prop()
    message: string
}

export const  NotificationSchema = SchemaFactory.createForClass(Notification).plugin(mongoosePaginate)

export const  NotificationSchemaAlias = 'notification'