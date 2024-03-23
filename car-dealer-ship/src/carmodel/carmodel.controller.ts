import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CarmodelService } from './carmodel.service';
import { CreateCarmodelDto } from './dto/create-carmodel.dto';
import { UpdateCarmodelDto } from './dto/update-carmodel.dto';

@Controller('carmodel')
export class CarmodelController {
  constructor(private readonly carmodelService: CarmodelService) {}

  @Post()
  create(@Body() createCarmodelDto: CreateCarmodelDto) {
    return this.carmodelService.create(createCarmodelDto);
  }

  @Get()
  findAll() {
    return this.carmodelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.carmodelService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateCarmodelDto: UpdateCarmodelDto
  ) {
    return this.carmodelService.update(id, updateCarmodelDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.carmodelService.remove(id);
  }
}
