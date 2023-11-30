import { Module } from '@nestjs/common';
import { rolService } from './rol.service';
import { RolController } from './rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
  Rol,Usuario,Cliente,Servicio
  ])],
  controllers: [RolController],
  providers: [rolService]
})
export class RolModule {}
