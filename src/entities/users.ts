import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class Users {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	email!: string;

	@Column({ unique: true, nullable: true })
	mobileNumber?: string;

	@Column({})
	name!: string;

	@Column({nullable: true})
	password?: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
