import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    @IsNotEmpty()
    firstName!: string;

    @Column()
    @IsNotEmpty()
    lastName!: string;

    @Column({ unique: true })
    @IsEmail()
    email!: string;

    @Column()
    @MinLength(6)
    password!: string;

    @Column()
    @IsNotEmpty()
    role!: 'famille' | 'aidant';

    @Column({ type: 'varchar', nullable: true })
    verificationCode?: string | null;

    @Column({ default: false })
    isVerified!: boolean;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}