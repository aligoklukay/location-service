import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

import {City} from './entities/city.entity'
import {District} from './entities/district.entity'
import {Neighbourhood} from './entities/neighbourhood.entity'
import {FindDistrictsQuery} from './dto/find-district-query.dto'
import {FindNeighbourhoodsQuery} from './dto/find-neighbourhood-query.dto'

@Injectable()
export class AppService {
    @InjectRepository(City) public cityRepository: Repository<City>
    @InjectRepository(District) public districtRepository: Repository<District>

    async findAllCities() {
        return await this.cityRepository.find()
    }

    async findCityDistricts(body: FindDistrictsQuery): Promise<District[]> {
        const city = await this.cityRepository.findOne({
            where: {
                id: body.id,
            },
            relations: ['districts'],
        })

        return city.districts
    }

    async findDistrictNeighbourhoods(body: FindNeighbourhoodsQuery): Promise<Neighbourhood[]> {
        const district = await this.districtRepository.findOne({
            where: {
                id: body.id,
            },
            relations: ['neighbourhoods'],
        })

        return district.neighbourhoods
    }
}
