import {NestFactory} from '@nestjs/core'
import {Transport} from '@nestjs/microservices'

import {AppModule} from './app.module'
import {ConfigService} from './config/config.service'

async function bootstrap() {
    const appContext = await NestFactory.createApplicationContext(AppModule)
    const config = appContext.get(ConfigService)

    const app = await NestFactory.createMicroservice(AppModule, {
        name: config.app.name,
        transport: Transport.TCP,
        options: {
            host: config.app.host,
            port: config.app.port,
        },
    })

    app.listen()
    appContext.close()
}
bootstrap()
