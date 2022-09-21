import {IsNotEmpty, IsNumber} from 'class-validator'

export class FindNeighbourhoodsQuery {
    @IsNotEmpty()
    @IsNumber()
    id: number
}
