import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema, ClientSchemaAlias } from 'src/schemas/client.schema';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ClientSchemaAlias, schema: ClientSchema }])
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService]
})
export class ClientModule {}
