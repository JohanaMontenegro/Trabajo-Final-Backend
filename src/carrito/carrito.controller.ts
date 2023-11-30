import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CarritoDTO } from './dto/carritoDTO';
import { Carrito } from './entities/carrito.entity';

@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}
  

    @Get()
    mostrarCarritos() {
      return this.carritoService.mostrarCarritos();
    }
  
    @Get(':id')
    mostrarUnCarrito(@Param('id') id: number) {
      return this.carritoService.mostrarCarrito(+id);
    }
    @Post()
      crearCarrito(@Body() carrito: CarritoDTO): Carrito | any {
      return this.carritoService.crearCarrito(carrito)
    }
    
    @Post(':carritoId/agregarProducto/:productoId')
  async agregarProductoAlCarrito(
    @Param('carritoId') carritoId: number,
    @Param('productoId') productoId: number,
  ): Promise<string> {
    await this.carritoService.agregarProductoAlCarrito(productoId, carritoId);
    return 'Producto agregado al carrito';
  }
  
    @Put(':id')
    actualizarCarrito(@Param('id')id:number,@Body() carrito:CarritoDTO){
      return this.carritoService.actualizar(id,carrito);
    }

    @Delete(':id')
    borrarCarrito(@Param('id') id: string) {
      return this.carritoService.borrarCarrito(+id);
    }
  }
  
  
