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

	@Column({ unique: true })
	mobileNumber!: string;

	@Column({})
	name!: string;

	@Column({})
	password!: string;

	@Column({ unique: true })
	username!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
