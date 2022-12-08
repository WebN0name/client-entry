import { Body, Controller, Post, HttpStatus, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEntryDTO } from 'src/dto/entry.dto';
import { PaginateDto } from 'src/dto/paginate.dto';
import { BaseError } from 'src/helpers';
import { EntryService } from './entry.service';

@Controller('entry')
@ApiTags('Entry')
export class EntryController {
    constructor(
        private readonly _entryService: EntryService
    ){}
    @Post('create')
    async createEntry(
        @Body() entry: CreateEntryDTO
    ){
        try {
            const result = await this._entryService.createEntry(entry)
            return result
        } catch (error) {
            if (error.statusCode) {
                throw new BaseError(error.message, error.statusCode);
            }
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    @Get()
    async getManyEntries(
        @Query() { limit, offset }: PaginateDto,
    ){
        try {
            const result = await this._entryService.getAllEntries(limit, offset)
            return result
        } catch (error) {
            if (error.statusCode) {
                throw new BaseError(error.message, error.statusCode);
            }
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    @Get('notifications')
    async getManyNotifications(
        @Query() { limit, offset }: PaginateDto,
    ){
        try {
            const result = await this._entryService.getAllNotifications(limit, offset)
            return result
        } catch (error) {
            if (error.statusCode) {
                throw new BaseError(error.message, error.statusCode);
            }
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }
}
