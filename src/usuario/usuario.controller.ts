import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CrearUsuarioDto } from './dto/crearUsuarioDTO';
import { UsuarioDTO } from './dto/usuarioDTO';
import { Rol } from 'src/rol/entities/rol.entity';
import { IsEmail } from 'class-validator';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  create(@Body() createUsuarioDTO: CrearUsuarioDto) {
    return this.usuarioService.create(createUsuarioDTO);
  }
  async findUserByEmail(email: string) {
    return this.usuarioService.findOneByEmail(email);
}
}
