import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EnvioService } from './envio.service';
import { EnvioDTO } from './dto/envioDTO';
import { Envio } from './entities/envio.entity';

@Controller('envio')
export class EnvioController {
  constructor(private readonly envioService: EnvioService) { }

  @Get()
  verEnvios() {
    return this.envioService.verEnvios();
  }

  @Get(':id')
  verUno(@Param('id') id: number) {
    return this.envioService.verUno(+id);
  }

  @Post()
  crearEnvio(@Body() envio: EnvioDTO): Envio | any {
    return this.envioService.crearEnvio(envio);
  }


  @Put(':id')
  actualizarEnvio(@Param('id') id: number, @Body() envio: EnvioDTO) {
    return this.envioService.actualizarEnvio(+id, envio);
  }

  @Delete(':id')
  borrarEnvio(@Param('id') id: number) {
    return this.envioService.borrarEnvio(+id);
  }

}
