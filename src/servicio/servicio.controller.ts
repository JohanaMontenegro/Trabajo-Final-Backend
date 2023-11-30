import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ServicioDTO } from './dto/servicioDTO';
import { Servicio } from './entities/servicio.entity';
import { ServicioService} from './servicio.service'

@Controller('servicio')
export class ServicioController {
  constructor(private readonly servicioService: ServicioService) { }

  @Get()
  verServicios() {
    return this.servicioService.verServicios();
  }

  @Get(':id')
  verUno(@Param('id') id: string) {
    return this.servicioService.verUno(+id);
  }

  @Post()
  crearServicio(@Body() servicioDto: ServicioDTO): Servicio | any {
    return this.servicioService.crearServicio(servicioDto);
  }

  @Put(':id')
  actualizarServicio(@Param('id') id: string, @Body() servicioDto: ServicioDTO) {
    return this.servicioService.actualizarServicio(+id, servicioDto);
  }

  @Delete(':id')
  borrarServicio(@Param('id') id: string) {
    return this.servicioService.borrarServicio(+id);

  }
}
