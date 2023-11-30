import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosDTO } from './dto/productoDTO';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  mostrarProductos() {
    return this.productosService.mostrarProductos();
  }

  @Get(':tipo')
  filtrarTipo(@Param('tipo') tipo: string) {
    return this.productosService.filtrarTipo(tipo);
  }
  @Get(':id')
  mostrarUno(@Param('id') id: string) {
    return this.productosService.mostrarUno(+id);
  }

  @Post()
  crearproducto(@Body() productoDto: ProductosDTO) {
    return this.productosService.crearProducto(productoDto);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() productoDto: ProductosDTO) {
    return this.productosService.actualizar(+id, productoDto);
  }

  @Delete(':id')
  borrarUno(@Param('id') id: string) {
    return this.productosService.borrarUno(+id);
  }
}
