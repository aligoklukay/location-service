import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
} from 'typeorm'

import {District} from './district.entity'

@Entity({name: 'neighbourhood'})
export class Neighbourhood {
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

    @ManyToOne(() => District, district => district.neighbourhoods)
    district: District
}
