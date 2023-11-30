import { Rol } from "src/rol/entities/rol.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('servicio')
export class Servicio{

    @PrimaryGeneratedColumn()
    idServicio: number

    @Column()
    nombreServicio: string

    @Column()
    urlImagen:string;

    @Column()
    descripcion: string;

    @Column()
    telefono: number;

    @OneToOne(() => Rol)
    @JoinColumn()
    public rol: Rol;


    constructor(nombreServicio: string, descripcion: string, telefono: number) {

        this.nombreServicio = nombreServicio;
        this.descripcion = descripcion;
        this.telefono = telefono;
    }

    public getNombre(): string {
        return this.nombreServicio;
    }

    public setNombre(nombre: string) {
        return this.nombreServicio = nombre;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public setDescripcion(descripcion: string) {
        return this.descripcion = descripcion;
    }

    public getTelefono(): number {
        return this.telefono;
    }

    public setTelefono(telefono: number) {
        return this.telefono = telefono;
    }
    
}

