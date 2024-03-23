import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { BrandsModule } from './brands/brands.module';
import { CarmodelModule } from './carmodel/carmodel.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [CarsModule, BrandsModule, CarmodelModule, SeedModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
