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

    //Un propietario posee nuchos vehiculos    
    @OneToMany(() => Vehiculo, (vehiculo) =>  vehiculo.propietario)
    vehiculos: Vehiculo[];

    //Muchos propieatarios pueden ser de un tipo de propietario
    @ManyToOne(() => TipoPropietario, (tipoPropietario) => tipoPropietario.propietarios,{
    onDelete: "CASCADE"
    ,onUpdate: "CASCADE"
})  
    @JoinColumn({name: "tipo_propietario_fk"}) 
    tipoPropietario: TipoPropietario;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date   

}