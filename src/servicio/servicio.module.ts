import { Module } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/rol/entities/rol.entity';
import { Servicio } from './entities/servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Rol,Servicio
    ])],
  
  controllers: [ServicioController],
  providers: [ServicioService]
})
export class ServicioModule {}
