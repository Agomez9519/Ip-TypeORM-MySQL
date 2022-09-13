import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./User";

@Entity()
@Unique(["id_role"])
export class Role{

    @PrimaryGeneratedColumn()
    id_role:number;

    @Column()
    @IsNotEmpty()  
    role:string;
    
    /*
    @OneToOne(() => User)
    username:User;
    */

    @OneToMany(() => User, (user)=>user.role)
    usernames:User[];
    

    
}

