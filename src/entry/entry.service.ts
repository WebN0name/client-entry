import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SchedulerRegistry, Timeout } from '@nestjs/schedule';
import mongoose, { PaginateModel } from 'mongoose';
import { ClientService } from 'src/client/client.service';
import { DoctorService } from 'src/doctor/doctor.service';
import { CreateEntryDTO } from 'src/dto/entry.dto';
import { BaseError } from 'src/helpers';
import { EntryDocument, EntrySchemaAlias } from 'src/schemas/entry.schema';
import { NotificationDocument, NotificationSchemaAlias } from 'src/schemas/notification.schema';

@Injectable()
export class EntryService {
    constructor(
        @InjectModel(EntrySchemaAlias) private _entryModel: PaginateModel<EntryDocument>,
        @InjectModel(NotificationSchemaAlias) private _notificationModel: PaginateModel<NotificationDocument>,
        private readonly _clientService: ClientService,
        private readonly _doctorService: DoctorService,
        private schedulerRegistry: SchedulerRegistry
    ) { }

    async createEntry(entry: CreateEntryDTO) {
        try {
            const entryData = { ...entry, clientId: new mongoose.Types.ObjectId(entry.clientId), doctorId: new mongoose.Types.ObjectId(entry.doctorId) }
            const isEntry = await this.isEntryExist(entryData.doctorId, entryData.dateTime)
            if (isEntry) throw new BaseError('entry on this time is already exist', HttpStatus.CONFLICT)
            const client = await this._clientService.isClient(entryData.clientId)
            const doctor = await this._doctorService.isDoctor(entryData.doctorId)
            const newDoctor = new this._entryModel({ ...entryData })
            await newDoctor.save()

            if (((entryData.dateTime - new Date(new Date().toUTCString()).getTime()) - Number(process.env.DAY_IN_MS)) > 0) {
                this.addTimeout('notification-per-1-day', (entryData.dateTime - Number(process.env.DAY_IN_MS)) - new Date(new Date().toUTCString()).getTime(), client, doctor, entryData.dateTime)
            }

            if (((entryData.dateTime - new Date(new Date().toUTCString()).getTime()) - Number(process.env.TWO_HOUR_IN_MS)) > 0) {
                this.addTimeout('notification-per-2-hour', 
                (entryData.dateTime - Number(process.env.TWO_HOUR_IN_MS)) - new Date(new Date().toUTCString()).getTime(), 
                client, doctor, entryData.dateTime)
            }
            return { status: true }
        } catch (error) {
            if (error.statusCode) {
                throw new BaseError(error.message, error.statusCode);
            }
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    addTimeout(name: string, milliseconds: number, client, doctor, time) {
        const callback = async () => {
            const dateTime = new Date(time)

            if (name === 'notification-per-1-day') {
                const newNotification = new this._notificationModel({message: `${new Date().getDay()}.${new Date().getMonth()}.${new Date().getFullYear()} | Hi ${client.name}! We remind you that you injure to ${doctor.spec} tomorrow in ${dateTime.getHours()}:${String(dateTime.getMinutes()).padStart(2, '0')}!`})
                await newNotification.save()
            }

            if (name === 'notification-per-2-hour') {
                const newNotification = new this._notificationModel({message:`${new Date().getDay()}.${new Date().getMonth()}.${new Date().getFullYear()}! You in 2 hours to ${doctor.spec} in ${dateTime.getHours()}:${String(dateTime.getMinutes()).padStart(2, '0')}!`})
                await newNotification.save()
            }
        };

        const timeout = setTimeout(callback, milliseconds);
        this.schedulerRegistry.addTimeout(name, timeout);
    }


    async isEntryExist(doctorId, dateTime) {
        try {
            const isExistsEntry = await this._entryModel.findOne({ doctorId, dateTime })
            return isExistsEntry
        } catch (error) {
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllEntries(limit: number, offset: number) {
        try {
            const entries = await this._entryModel.paginate({}, { offset, limit })
            return entries
        } catch (error) {
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllNotifications(limit: number, offset: number) {
        try {
            const notifications = await this._notificationModel.paginate({}, { offset, limit })
            return notifications
        } catch (error) {
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
