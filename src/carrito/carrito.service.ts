import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CarritoDTO } from './dto/carritoDTO';
import { Carrito } from './entities/carrito.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class CarritoService {
    private carrito: Carrito[] = [];

  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
        @InjectRepository(Carrito)
        private carritoRepository: Repository<Carrito>,
  ) { }

async agregarProductoAlCarrito(idProducto: number, carritoId: number): Promise<void> {
    const productoId:FindOneOptions={ where:{idProducto:idProducto}}
    const producto = await this.productoRepository.findOne(productoId);
    const idCarrito:FindOneOptions={ where:{carritoId:carritoId,relations: ['productos'] }}
    const carrito = await this.carritoRepository.findOne(idCarrito);
    carrito.productos.push(producto);
    await this.carritoRepository.save(carrito);
  }



      public async mostrarCarritos(): Promise < Carrito[] > {
    try {

        this.carrito = await this.carritoRepository.find();
        if(this.carrito)
        return this.carrito;
        else
                  throw new Error('No se encuentran carritos.')
    } catch(error) {
        throw new HttpException({
            status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda: ' + error
        }, HttpStatus.NOT_FOUND);
    }
}
      public async mostrarCarrito(id: number): Promise < Carrito[] > {
    try {
        const criterio: FindOneOptions = { where: { idCarrito: id } }
              let carrito: Carrito = await this.carritoRepository.findOne(criterio);
        this.carrito = [];
        if(carrito)
                  this.carrito.push(carrito);
        else
                  throw new Error('El carrito no se encuentra.')
              return this.carrito;
    } catch(error) {
        throw new HttpException({
            status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda del carrito ' + id + ' : ' + error
        }, HttpStatus.NOT_FOUND);
    }
}
      public async crearCarrito(datos: CarritoDTO): Promise < Carrito > {
    try {
        if(datos.idCarrito && datos.precioTotal)
        if(await this.carritoCreado(datos.idCarrito)) {
    throw new Error('El carrito ya se encuentra.')
} else {
    let carrito: Carrito = await this.carritoRepository.save(
        new Carrito(datos.precioTotal))
    return carrito;
}
  
          } catch (error) {
    throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
        HttpStatus.NOT_FOUND)
}


      }
      public async borrarCarrito(id: number): Promise < string > {
    try {
        if(id)
                  if(await this.carritoCreado(id)) {
    await this.carritoRepository.delete(id);
} else
throw new Error('La ciudad no se encuentra.')
              else
throw new Error('No hay datos para eliminar ciudades');
return "ok";
          } catch (error) {
    throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
        HttpStatus.NOT_FOUND)
}
      }
  
      public async actualizar(id: number, datos: CarritoDTO): Promise < string > {
    try {
        if(datos)
                  if(datos.precioTotal)
        if(await this.carritoCreado(id)) {
    let criterio: FindOneOptions = { where: { idCarrito: id } }
    let carrito: Carrito = await this.carritoRepository.findOne(criterio);
    carrito.setPrecioTotal(datos.precioTotal);
    await this.carritoRepository.save(carrito);
} else
throw new Error('La ciudad no se encuentra.')
                  else
throw new Error('Los datos para modificar ciudad no son validos');
              else
throw new Error('No hay datos para modificar ciudades');
return "ok";
          } catch (error) {
    throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
        HttpStatus.NOT_FOUND)
}
      }
  
      private async carritoCreado(id: number): Promise < boolean > {
    let criterio: FindOneOptions = { where: { idCcarrito: id } };
    let carrito: Carrito = await this.carritoRepository.findOne(criterio);
    return(carrito != null);
      }
  }

