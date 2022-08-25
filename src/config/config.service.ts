import {Injectable} from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as Yup from 'yup'

@Injectable()
export class ConfigService {
    app: {
        name: string
        port: number
        host: string
    }

    postgres: {
        host: string
        port: number
        user: string
        ssl: boolean
        password: string
        database: string
    }

    constructor() {
        ConfigService.loadFromEnvFile()
        const vars = Object.assign({}, process.env) as any
        try {
            this.registerApp(vars)
            this.registerPostgres(vars)
        } catch (error: any) {
            throw new Error(`Config validation error: ${error.message}`)
        }
    }

    private static loadFromEnvFile() {
        if (process.env.ENV === 'test') {
            dotenv.config({path: '.env.test'})
            return
        }
        dotenv.config()
    }

    private registerApp(vars: {[varName: string]: any}) {
        const appSchema = Yup.object().shape({
            ENV: Yup.string().oneOf(['development', 'test', 'production']).default('production'),
            APP_PORT: Yup.number().default(3000),
            APP_HOST: Yup.string().optional(),
            APP_NAME: Yup.string().required(),
        })
        const config = appSchema.validateSync(vars, {stripUnknown: true})
        this.app = {
            port: config.APP_PORT,
            name: config.APP_NAME,
            host: config.APP_HOST,
        }
    }

    private registerPostgres(vars: {[varName: string]: any}) {
        const appSchema = Yup.object().shape({
            POSTGRES_HOST: Yup.string().required(''),
            POSTGRES_PORT: Yup.number().required(),
            POSTGRES_USER: Yup.string().required(),
            POSTGRES_SSL: Yup.boolean().required(),
            POSTGRES_PASSWORD: Yup.string().required(),
            POSTGRES_DATABASE: Yup.string().required(),
        })

        const config = appSchema.validateSync(vars, {stripUnknown: true})
        this.postgres = {
            host: config.POSTGRES_HOST,
            port: config.POSTGRES_PORT,
            user: config.POSTGRES_USER,
            ssl: config.POSTGRES_SSL,
            password: config.POSTGRES_PASSWORD,
            database: config.POSTGRES_DATABASE,
        }
    }
}
