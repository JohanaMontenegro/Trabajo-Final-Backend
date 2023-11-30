import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasDTO } from './dto/ventasDTO';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  agregarAventa(@Body() ventaDto: VentasDTO) {
    return this.ventasService.agregarAventa(ventaDto);
  }

  @Get()
  mostrarProductos() {
    return this.ventasService.mostrarProductos();
  }

  @Get(':id')
  mostrarUno(@Param('id') id: string) {
    return this.ventasService.mostrarUno(+id);
  }

  @Put(':id')
  actualizarDatos(@Param('id') id: string, @Body() ventaDto:VentasDTO) {
    return this.ventasService.actualizarDatos(+id, ventaDto);
  }

  @Delete(':id')
  borrarVenta(@Param('id') id: string) {
    return this.ventasService.borrarVenta(+id);
  }
}
