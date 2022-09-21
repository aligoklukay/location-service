import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {City, District, Neighbourhood} from 'tatildekirala-entities'

import {AppController} from './app.controller'
import {AppService} from './app.service'
import {AppTransformer} from './app.transformer'
import {ConfigModule} from './config/config.module'
import {ConfigService} from './config/config.service'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.postgres.host,
                port: config.postgres.port,
                ssl: config.postgres.ssl,
                username: config.postgres.user,
                password: config.postgres.password,
                database: config.postgres.database,
                keepConnectionAlive: true,
                autoLoadEntities: true,
                autoloadModel: true,
                synchronize: false,
                entities: [__dirname + '/entities/*.js', __dirname + '/entities/*.ts'],
                subscribers: [__dirname + '/subscribers/*.js', __dirname + '/subscribers/*.ts'],
                logging: 'all',
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([City, District, Neighbourhood]),
    ],
    controllers: [AppController],
    providers: [AppService, AppTransformer],
})
export class AppModule {}
