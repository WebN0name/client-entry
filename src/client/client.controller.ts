import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CreateClientDTO } from 'src/dto/client.dto';
import { BaseError } from 'src/helpers';
import { ClientService } from './client.service';

@Controller('client')
@ApiTags('Client')
export class ClientController {
    constructor(
        private readonly _clentService: ClientService
    ) { }

    @Post('create')
    async createClient(
        @Body() client: CreateClientDTO
    ) {
        try {
            const result = await this._clentService.createClient(client)
            return result
        } catch (error) {
            if (error.statusCode) {
                throw new BaseError(error.message, error.statusCode);
              }
              throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
