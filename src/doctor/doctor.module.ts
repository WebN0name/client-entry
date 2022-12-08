import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorSchema, DoctorSchemaAlias } from 'src/schemas/doctor.schema';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DoctorSchemaAlias, schema: DoctorSchema }])
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService]
})
export class DoctorModule {}
