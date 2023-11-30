import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { VentasModule } from './ventas/ventas.module';
import { MediosPagoModule } from './medios-pago/medios-pago.module';
import { EnvioModule } from './envio/envio.module';
import { CarritoModule } from './carrito/carrito.module';
import { ServicioModule } from './servicio/servicio.module';
import { ClienteModule } from './cliente/cliente.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({

    "type": "mysql",
    "host": "bqgwarpt3ycrzwn9uhr5-mysql.services.clever-cloud.com",
    "port": 3306,
    "username": "utqfggtzrrbfz6ji",
    "password": "v4MthVSDGFAnZUvIIhva",
    "database": "bqgwarpt3ycrzwn9uhr5",
    "entities": [__dirname + '/../dist/**/entities/*.entity.{js,ts}'
    ],
    "synchronize": true
  }),
    ProductosModule, VentasModule, MediosPagoModule, EnvioModule, CarritoModule, ServicioModule, ClienteModule, UsuarioModule, RolModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
