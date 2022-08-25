import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm'
import {District} from './district.entity'

@Entity({name: 'city'})
export class City {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column({unique: true})
    slug: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: Date

    /**
     * Relations
     */

    @OneToMany(() => District, district => district.city)
    districts: District[]
}
