import { Carrito } from 'src/carrito/entities/carrito.entity';
import { Envio } from 'src/envio/entities/envio.entity';
import { MedioPago } from 'src/medios-pago/entities/medios-pago.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity('venta')
export class Venta {

    @PrimaryGeneratedColumn()
    idVenta: number;

    @Column()
    idUsuario: number;

    @Column()
    idMedioPago: number;

    @Column()
    idEnvio: number;

    @Column()
    estado: string;

    @OneToOne(() => Carrito)
    @JoinColumn()
    public carrito: Carrito

    @ManyToOne(() => Envio, envio => envio.ventas)
    envio: Envio;

    @ManyToOne(() => MedioPago, medio => medio.ventas)
    medio: MedioPago;

    @ManyToOne(() => Usuario, usuario => usuario.ventas)
    usuario: Usuario;
    
    constructor(estado: string) {

        this.estado = estado;
    }
    public getEstado(): string { return this.estado; }
    public setEstado(estado: string): void { this.estado = estado }
}

