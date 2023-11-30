import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './entities/producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from 'src/carrito/entities/carrito.entity';
import { Venta } from 'src/ventas/entities/venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Producto,Carrito
  ])],

  controllers: [ProductosController],
  providers: [ProductosService]
})
export class ProductosModule {}
