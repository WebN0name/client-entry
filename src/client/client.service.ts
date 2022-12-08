import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { CreateClientDTO } from 'src/dto/client.dto';
import { BaseError } from 'src/helpers';
import { ClientDocument, ClientSchemaAlias } from 'src/schemas/client.schema';

@Injectable()
export class ClientService {
    constructor(
        @InjectModel(ClientSchemaAlias) private _clientModel: PaginateModel<ClientDocument>
    ) { }


    async createClient(client: CreateClientDTO) {
        try {
            const newClient = new this._clientModel({ ...client })
            await newClient.save()
            return { status: true }
        } catch (error) {
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllClient(limit: number, offset: number) {
        try {
            const clients = await this._clientModel.paginate({}, { offset, limit })
            return clients
        } catch (error) {
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async isClient(_id) {
        try {
            const isExist = await this._clientModel.findOne({ _id })
            if (!isExist) throw new BaseError(`client with this id: ${String(_id)} not found`, HttpStatus.NOT_FOUND)

            return isExist
        } catch (error) {
            if (error.statusCode) {
                throw new BaseError(error.message, error.statusCode);
            }
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
