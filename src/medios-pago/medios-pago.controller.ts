import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MedioPagoService } from './medios-pago.service';
import { MedioPagoDTO } from './dto/medio-pagoDTO';

@Controller('medios-pago')
export class MediosPagoController {
  constructor(private readonly mediosPagoService: MedioPagoService) { }

  @Get()
  mostrarMedios() {
    return this.mediosPagoService.mostrarMedios();
  }

  @Get(':id')
  mostrarUnMedio(@Param('id') id: string) {
    return this.mediosPagoService.mostrarUnMedio(+id);

  }
  @Post()
  crearMedio(@Body() mediosPagoDto: MedioPagoDTO) {
    return this.mediosPagoService.crearMedio(mediosPagoDto);
  }


  @Put(':id')
  actualizarMedio(@Param('id') id: string, @Body() mediosPagoDto: MedioPagoDTO) {
    return this.mediosPagoService.actualizarMedio(+id, mediosPagoDto);
  }

  @Delete(':id')
  borrarMedio(@Param('id') id: string) {
    return this.mediosPagoService.borrarMedio(+id);
  }
}
