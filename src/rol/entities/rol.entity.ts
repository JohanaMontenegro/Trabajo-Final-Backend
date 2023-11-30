import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';

@Entity('rol')
export class Rol {

    @PrimaryGeneratedColumn()
    idRol: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @OneToOne(() => Cliente)
    @JoinColumn()
    public cliente: Cliente;

    @OneToOne(() => Servicio)
    @JoinColumn()
    public servicio: Servicio;

    @OneToMany(() => Usuario, usuario => usuario.rol)
    usuarios: Usuario[];

    constructor(nombre: string, descripcion: string) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
    public getNombre(): string { return this.nombre; }
    public setNombre(nombre: string): void { this.nombre = nombre; }
    public getDescripcion(): string { return this.descripcion; }
    public setDescripcion(descripcion: string): void { this.descripcion = descripcion; }
}




