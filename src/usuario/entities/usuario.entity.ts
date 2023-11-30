import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "src/rol/entities/rol.entity";
import { Venta } from "src/ventas/entities/venta.entity";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    idUsuario: number;

    @Column()
    idRol: number;

    @Column({ default: 'usuario' })
    role: string;

    @Column()
    nombre: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ unique: true, nullable: false })
    contraseña: string;

    @ManyToOne(() => Rol, rol => rol.usuarios)
    rol: Rol;

    @OneToMany(() => Venta, venta => venta.usuario)
    ventas: Venta[];

    constructor(nombre: string, email: string, contraseña: string) {

        this.nombre = nombre;
        this.email = email;
        this.contraseña = contraseña;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string) {
        return this.nombre = nombre;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string) {
        return this.email = email;
    }

    public getContraseña(): string {
        return this.contraseña;
    }

    public setContraseña(contraseña: string) {
        return this.contraseña = contraseña;
    }
}

