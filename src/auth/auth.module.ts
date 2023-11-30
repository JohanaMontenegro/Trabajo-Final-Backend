import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { jtwConstants } from './constants/jwt.constants';

@Module({
  imports: [UsuarioModule,
  JwtModule.register({
    global: true,
    secret: jtwConstants.secret,
    signOptions :{ expiresIn:'60s'}
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
