import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from "uuid";

@Injectable()
export class BrandsService {

  // 2.Se crea una propiedad llamada brand de tipo del entity que se creo, este sera un arreglo.
  private brands: Brand[] = [
    // {
    //   // Se debe importar el uuid(), siempre es de tipo string
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime()
    // }
  ]


  // Este parámetro es un objeto de tipo CreateBrandDto que contiene la información necesaria para crear la nueva marca.
  create(createBrandDto: CreateBrandDto) {

    // Se crea una nueva variable llamada brand del tipo Brand. Este tipo probablemente sea una clase o interfaz que define la estructura de una marca, incluyendo propiedades como id, nombre y fechaCreacion.
    const brand: Brand = {
      // genera un ID aleatorio para garantizar que cada marca tenga un identificador único
      id: uuid(),
      // Establece el nombre de la marca usando la propiedad nombre del createBrandDto, pero lo convierte a minúsculas.
      name: createBrandDto.name.toLowerCase(),
      // Guarda la fecha y hora de creación de la marca usando la marca de tiempo actual obtenida con new Date().getTime().
      createdAt: new Date().getTime()
    }
    
    // Agrega la nueva marca creada al array
    this.brands.push(brand);

    // Finalmente, la función devuelve el objeto brand que representa la nueva marca creada. Esta marca puede ser utilizada posteriormente en la aplicación.
    return brand;
  }

  findAll() {
    return this.brands;
  }


  // Este parámetro representa la cadena de identificación (ID) de la marca que se desea encontrar.
  findOne(id: string) {

    // Esta línea utiliza el método find sobre la lista de marcas this.brands. La función find itera sobre cada elemento del arreglo y devuelve el primer elemento que cumple con la condición proporcionada. En este caso, la condición es brand => brand.id === id, lo que significa que busca una marca cuyo atributo id sea igual al id proporcionado.
    const brand = this.brands.find(brand => brand.id === id);

    // Esta línea comprueba si la variable brand tiene un valor false. Esto significa que el método find no encontró ninguna marca con el id especificado.
    if (!brand)

    // Si no se encontró la marca, la función lanza una excepción NotFoundException indicando que la marca con el id proporcionado no se encuentra en la lista. Este error puede ser manejado posteriormente en tu código para informar al usuario o realizar acciones específicas.
      throw new NotFoundException(`Brand with id "${id}" not found`);

      // Si la marca se encontró en el paso 2, la función simplemente devuelve el objeto brand, que contiene la información de la marca buscada.
    return brand;

  }

  // id: Es una cadena que representa el identificador único de la marca que deseas actualizar.
  // updateBrandDto: Es un objeto que contiene los nuevos valores para las propiedades de la marca. El tipo de este objeto probablemente sea UpdateBrandDto, que probablemente sea una clase personalizada que define la estructura esperada de los datos de actualización.
  update(id: string, updateBrandDto: UpdateBrandDto) {

    // this.findOne(id): Esta línea probablemente usa una dependencia o un método integrado para recuperar la información de la marca existente de la base de datos en función del id proporcionado. Almacena la información recuperada en la variable brandDB.
    let brandDB = this.findOne(id);

    // this.brands.map(brand => {...}): Esta parte usa la función map para iterar sobre todas las marcas existentes (probablemente almacenadas en la matriz this.brands).
    this.brands = this.brands.map(brand => {

      // Esta condición comprueba si el id de la marca actual coincide con el id proporcionado para identificar la marca objetivo para la actualización.
      if (brand.id === id) {

        // brandDB.updateAt = new Date().getTime(): Esta línea actualiza la propiedad updateAt del objeto brandDB recuperado con la marca de tiempo actual, presumiblemente marcando la hora de la actualización.
        brandDB.updateAt = new Date().getTime()

        // Esta línea usa la sintaxis de expansión de objetos para combinar las propiedades de brandDB (que contiene datos existentes) con las propiedades de updateBrandDto (que contiene datos de actualización). Esto efectivamente actualiza el objeto brandDB con los nuevos valores.
        brandDB = { ...brandDB, ...updateBrandDto }
        return brandDB;
      }

      // Si el id de la marca actual no coincide, simplemente devuelve el objeto brand original sin ningún cambio.
      return brand;
    });

    // return brandDB;: Devuelve el objeto brandDB actualizado para la marca coincidente
    return brandDB;
  }



  // Este parámetro representa la cadena de identificación (ID) de la marca que se desea eliminar.
  remove(id: string) {
  // Toma la lista actual de marcas almacenada en this.brands.
  // Aplica el método filter para crear una nueva lista filtrada.
  // La condición del filtro es brand => brand.id !== id, lo que significa que solo se incluyen en la nueva lista las marcas cuyo id sea diferente al id especificado para eliminar.
  // La nueva lista filtrada se asigna nuevamente a this.brands, reemplazando la lista original.
    this.brands = this.brands.filter(brand => brand.id !== id);
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
}
}
