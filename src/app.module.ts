import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientModule } from './client/client.module';
import { DoctorModule } from './doctor/doctor.module';
import { EntryModule } from './entry/entry.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.DB),
    ClientModule,
    DoctorModule,
    EntryModule
  ]
})
export class AppModule {}
