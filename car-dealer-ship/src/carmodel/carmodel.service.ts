import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarmodelDto } from './dto/create-carmodel.dto';
import { UpdateCarmodelDto } from './dto/update-carmodel.dto';
import { Carmodel } from './entities/carmodel.entity';
import { v4 as uuid } from "uuid";

@Injectable()
export class CarmodelService {

  private carmodels:Carmodel[] = [
    {
      id:uuid(),
      name:'Fortuner',
      createdAt: new Date().getTime()
    }
  ]
  create(createCarmodelDto: CreateCarmodelDto) {
    const carmodel:Carmodel = {
      id:uuid(),
      name:createCarmodelDto.name.toLowerCase(),
      createdAt: new Date().getTime()
    }
    this.carmodels.push(carmodel);
    return carmodel;
  }

  findAll() {
    return this.carmodels;
  }

  findOne(id: string) {
    const carmodel = this.carmodels.find(carmodel => carmodel.id === id);
    if (!carmodel) {
      throw new NotFoundException(`Carmodel with id ${id} not found`)
    }
    return carmodel;
  }

  update(id: string, updateCarmodelDto: UpdateCarmodelDto) {
    // return `This action updates a #${id} carmodel`;
    let carmodelDB = this.findOne(id);
    this.carmodels = this.carmodels.map(carmodel =>  {
      if (carmodel.id === id) {
        carmodelDB.updatedAt = new Date().getTime()
        carmodelDB = {...carmodelDB, ...updateCarmodelDto}
        return carmodelDB;
      }
      return carmodel;
    })
    return carmodelDB;
  }

  remove(id: string) {
    this.carmodels = this.carmodels.filter(carmodel => carmodel.id !== id)
  }
}
