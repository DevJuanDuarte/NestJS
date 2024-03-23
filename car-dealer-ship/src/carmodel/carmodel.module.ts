import { Module } from '@nestjs/common';
import { CarmodelService } from './carmodel.service';
import { CarmodelController } from './carmodel.controller';

@Module({
  controllers: [CarmodelController],
  providers: [CarmodelService]
})
export class CarmodelModule {}
