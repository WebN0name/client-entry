import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from 'src/client/client.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { EntrySchema, EntrySchemaAlias } from 'src/schemas/entry.schema';
import { NotificationSchema, NotificationSchemaAlias } from 'src/schemas/notification.schema';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EntrySchemaAlias, schema: EntrySchema }, { name: NotificationSchemaAlias, schema: NotificationSchema }]),
    DoctorModule,
    ClientModule
  ],
  controllers: [EntryController],
  providers: [EntryService]
})
export class EntryModule {}
