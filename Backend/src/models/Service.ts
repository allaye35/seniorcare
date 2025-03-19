import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './User';

@Entity()
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    type!: string;

    @Column()
    location!: string;

    @Column({ type: 'date' })
    availabilityDate!: Date;

    @Column({ type: 'time' })
    startTime!: string;

    @Column({ type: 'time' })
    endTime!: string;

    @Column('decimal')
    price!: number;

    @ManyToOne(() => User, user => user.id, { nullable: false })
    caregiver!: User;
}
