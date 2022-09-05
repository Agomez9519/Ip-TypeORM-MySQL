import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, Unique, UpdateDateColumn } from "typeorm";
import { TipoPropietario } from "./TipoPropietario";
import { User } from "./User";
import { Vehiculo } from "./Vehiculo";

@Entity()
@Unique(["rut"])

export class Propietario {

    @PrimaryColumn()
    rut:string;

    @Column()
    @IsNotEmpty()
    desc_propietario:string;

    @Column()
    @IsNotEmpty()
    direccion:string;

    @Column()
    @IsNotEmpty()
    telefono:string;

    @OneToOne(() => User)
    @JoinColumn({name:"username_fk"})
    username:User;

    @OneToMany(() => Vehiculo, (vehiculo) =>  vehiculo.propietario)
    vehiculos: Vehiculo[];

    @OneToOne(() => TipoPropietario) 
    @JoinColumn({name: "tipo_vehiculo_fk"}) 
    tipoPropietario: TipoPropietario;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date   

}