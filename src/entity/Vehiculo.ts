import { IsNotEmpty } from "class-validator";
import internal = require("stream");
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, Unique, UpdateDateColumn } from "typeorm";
import { Multa } from "./Multa";
import { Propietario } from "./Propietario";
import { TipoVehiculo } from "./TipoVehiculo";

@Entity()
@Unique(['patente'])
export class Vehiculo{

    @PrimaryColumn()
    patente:string;

    @Column()
    @IsNotEmpty()
    marca:string;

    @Column()
    @IsNotEmpty()
    modelo:string;

    @Column()
    @IsNotEmpty()
    anio:number;

    @Column()
    @IsNotEmpty()
    n_motor:string;

    @Column()
    @IsNotEmpty()
    n_chasis:string;

    //Muchos autos le pertenecen a un usuario, al eliminar un propietario, la tupla se elimina
    @ManyToOne(() => Propietario, (propietario) => propietario.vehiculos,{cascade: true})
    @JoinColumn({name: "propietario_fk"}) 
    propietario: Propietario;

    @ManyToOne(() => TipoVehiculo, (tipoVehiculo) => tipoVehiculo.vehiculos,{
        onDelete: "CASCADE"
        ,onUpdate: "CASCADE"
    })
    @JoinColumn({name: "tipo_vehiculo_fk"}) 
    tipoVehiculo: TipoVehiculo;

    @OneToMany(() => Multa, (multa) => multa.vehiculo)  
    multas: Multa[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date   
}