import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { rolService } from './rol.service';
import { rolDTO } from './dto/rolDTO';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: rolService) {}

  @Get()
  mostrarRoles() {
    return this.rolService.mostrarRoles();
  }

  @Get(':id')
  mostrarUnRol(@Param('id') id: string) {
    return this.rolService.mostrarUnRol(+id);
  }

  @Post()
  crearUnRol(@Body() rolDto: rolDTO) {
    return this.rolService.crearUnRol(rolDto);
  }

  @Put(':id')
  actualizarRol(@Param('id') id: string, @Body() rolDto: rolDTO) {
    return this.rolService.actualizarRol(+id, rolDto);
  }

  @Delete(':id')
  borrarRol(@Param('id') id: string) {
    return this.rolService.borrarRol(+id);
  }
}
