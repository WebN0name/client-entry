import { Body, Controller, Post, HttpStatus, Query, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { skip } from 'rxjs';
import { CreateClientDTO } from 'src/dto/client.dto';
import { PaginateDto } from 'src/dto/paginate.dto';
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

    @Get('/')
    async getManyClients(
        @Query() { limit, offset }: PaginateDto,
    ) {
        try {
            const result = await this._clentService.getAllClient(limit, offset)

            return result

        } catch (error) {
            if (error.statusCode) {
                throw new BaseError(error.message, error.statusCode);
            }
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
