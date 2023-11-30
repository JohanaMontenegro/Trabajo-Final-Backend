import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CrearUsuarioDto } from './dto/crearUsuarioDTO';

@Injectable()
export class UsuarioService {

    constructor(@InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>) { }

    create(crearUsuarioDTO: CrearUsuarioDto) {
        return this.usuarioRepository.save(crearUsuarioDTO)
    }

    async findOneByEmail(email: string) {
        return this.usuarioRepository.findOneBy({ email });
    }
}