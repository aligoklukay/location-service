import {IsNotEmpty, IsString} from 'class-validator'

export class FindNeighbourhoodsQuery {
    @IsNotEmpty()
    @IsString()
    id: string
}
