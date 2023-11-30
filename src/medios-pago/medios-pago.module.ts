import { Module } from '@nestjs/common';
import { MedioPagoService } from './medios-pago.service';
import { MediosPagoController } from './medios-pago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedioPago } from './entities/medios-pago.entity';
import { Venta } from 'src/ventas/entities/venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
  MedioPago,Venta
  ])],
  controllers: [MediosPagoController],
  providers: [MedioPagoService]
})
export class MediosPagoModule { }
