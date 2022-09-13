import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Multa } from "./Multa";

@Entity()
@Unique(["id_juzgado"])
export class Juzgado{

    @PrimaryGeneratedColumn()
    id_juzgado:number;

    @Column()
    @IsNotEmpty()  
    desc_juzgado:string;
    
    @OneToMany(() => Multa, (multa)=> multa.juzgado)
    multas:Multa[];
}