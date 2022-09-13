import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Propietario } from "./Propietario";



@Entity()
@Unique(['id_tipo'])
export class TipoPropietario{

    @PrimaryGeneratedColumn()
    id_tipo:number;

    @Column()
    @IsNotEmpty()
    descripcion:string;

    //un tipo de propietario puede tener muchos propietarios
    @OneToMany(() => Propietario , (propietario) => propietario.tipoPropietario)
    propietarios: Propietario[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date   

}