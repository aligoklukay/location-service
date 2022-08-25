import {Body, Controller, Inject, UseFilters} from '@nestjs/common'
import {MessagePattern} from '@nestjs/microservices'

import {AppService} from './app.service'
import {AppTransformer} from './app.transformer'
import {FindDistrictsQuery} from './dto/find-district-query.dto'
import {FindNeighbourhoodsQuery} from './dto/find-neighbourhood-query.dto'
import {ExceptionFilter} from './filters/rpc-exception.filter'

@UseFilters(new ExceptionFilter())
@Controller()
export class AppController {
    @Inject() private readonly service: AppService
    @Inject() private readonly transformer: AppTransformer

    // @MessagePattern({cmd: 'login-google'})
    // public async loginGoogle(@Body() body: AuthLoginGoogleDto): Promise<any> {
    //     const user = await this.service.findByGoogleId(body.googleId)
    //     if (!user) {
    //         throw new RpcException({
    //             status: 500,
    //             code: 'users.not_exists',
    //             message: 'User not exists',
    //         })
    //     }

    //     return await this.service.loginGoogle(user)
    // }

    @MessagePattern({cmd: 'get-cities'})
    public async findAllCities(): Promise<any> {
        const cities = await this.service.findAllCities()

        return cities.map(item => this.transformer.cityToPublicEntity(item))
    }

    @MessagePattern({cmd: 'get-city-districts'})
    public async findCityDistricts(@Body() body: FindDistrictsQuery): Promise<any> {
        const districts = await this.service.findCityDistricts(body)

        return districts.map(item => this.transformer.districtToPublicEntity(item))
    }

    @MessagePattern({cmd: 'get-district-neighborhoods'})
    public async findDistrictNeighbourhoods(@Body() body: FindNeighbourhoodsQuery): Promise<any> {
        const neighborhoods = await this.service.findDistrictNeighbourhoods(body)

        return neighborhoods.map(item => this.transformer.neighbourhoodToPublicEntity(item))
    }
}
