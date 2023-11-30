import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Rol } from 'src/rol/entities/rol.entity';

@Entity('cliente')
export class Cliente {

    @PrimaryGeneratedColumn()
    idCliente: number;

    @Column()
    nombreApellido: string;

    @Column()
    direccion: string;

    @Column()
    telefono: number;

    constructor(nombreApellido: string, direccion: string, telefono: number) {
        this.nombreApellido = nombreApellido;
        this.direccion = direccion;
        this.telefono = telefono;
    }
    public getNombreApellido(): string { return this.nombreApellido; }
    public setNombreApellido(nombre: string): void { this.nombreApellido = nombre; }
    public getDireccion(): string { return this.direccion; }
    public setDireccion(direccion: string): void { this.direccion = direccion; }
    public getTeleono(): number { return this.telefono; }
    public setTelefono(telefono: number): void { this.telefono = telefono; }
}




