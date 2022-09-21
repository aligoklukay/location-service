import {IsNotEmpty, IsNumber} from 'class-validator'

export class FindDistrictsQuery {
    @IsNotEmpty()
    @IsNumber()
    id: number
}
