import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Vehiculo } from "./Vehiculo";



@Entity()
@Unique(['tipoVehiculo'])
export class TipoVehiculo{

    @PrimaryGeneratedColumn()
    tipoVehiculo:number;

    @Column()
    @IsNotEmpty()
    descripcion:string;

    @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.tipoVehiculo)
    vehiculos:Vehiculo[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date   
}