import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm'

import { City } from './city.entity'
import { Neighbourhood } from './neighbourhood.entity'

@Entity({name: 'district'})
export class District {
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

     @ManyToOne(() => City, (city) => city.districts)
     city: City

     @OneToMany(() => Neighbourhood, neighbourhood => neighbourhood.district)
     neighbourhoods: Neighbourhood[]
}
