import {Injectable} from '@nestjs/common'

import {City} from './entities/city.entity'
import {District} from './entities/district.entity'
import {Neighbourhood} from './entities/neighbourhood.entity'

@Injectable()
export class AppTransformer {
    cityToPublicEntity(city: City) {
        return {
            id: city.id,
            name: city.name,
            slug: city.slug,
        }
    }

    districtToPublicEntity(district: District) {
        return {
            id: district.id,
            name: district.name,
            slug: district.slug,
        }
    }

    neighbourhoodToPublicEntity(neighbourhood: Neighbourhood) {
        return {
            id: neighbourhood.id,
            name: neighbourhood.name,
            slug: neighbourhood.slug,
        }
    }
}
