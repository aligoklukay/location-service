import {IsNotEmpty, IsString} from 'class-validator'

export class FindDistrictsQuery {
    @IsNotEmpty()
    @IsString()
    id: string
}
