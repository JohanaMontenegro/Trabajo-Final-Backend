import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RegisterDTO } from './registerDTO';
import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './loginDto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService) { }

  async register({ nombre, email, contraseña }: RegisterDTO) {
    const Usuario = await this.usuarioService.findOneByEmail(email)
    if (Usuario) {
      throw new BadRequestException('el usuario ya existe')
    }
    return await this.usuarioService.create({ nombre, email, contraseña: await bcryptjs.hash(contraseña, 10) });
  };

  async login({ email, contraseña }: LoginDto) {
    const usuario = await this.usuarioService.findOneByEmail(email)
    if (!usuario) {
      throw new UnauthorizedException('email incorrecto')
    }
    const isPasswordValid = await bcryptjs.compare(contraseña, usuario);
    if (!isPasswordValid) {
      throw new UnauthorizedException('contraseña incorrecta')
    }
    const payload = { email: usuario };
    const token = await this.jwtService.signAsync(payload)
    return token
  }
}
