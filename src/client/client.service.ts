import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDTO } from 'src/dto/client.dto';
import { BaseError } from 'src/helpers';
import { ClientDocument, ClientSchemaAlias } from 'src/schemas/client.schema';

@Injectable()
export class ClientService {
    constructor(
        @InjectModel(ClientSchemaAlias) private _clientModel: Model<ClientDocument>
    ){}


    async createClient(client: CreateClientDTO){
        try {
            const newClient = new this._clientModel({...client})
            await newClient.save()
            return {status: true}
        } catch (error) {
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
