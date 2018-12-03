import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import {API_CODE, IPodiumErrorResponse, IPodiumPromise, IResponse, ISettings} from '../../types'
import {ConvertTime} from './ConvertTime'
import {Filter} from './Filter'
import {Token} from './Token'
import {Paginator} from './Paginator'
import {Settings} from './Settings'

export class Request extends Token {
    private static parseError(error: AxiosError): IPodiumErrorResponse {
        if (error.response) {
            const message =
                (typeof error.response.data === 'object' &&
                    (error.response.data.message
                        || (error.response.data.detail && Object.values(error.response.data.detail)
                            .map((errorDetail)  =>
                                (typeof errorDetail === 'string' && errorDetail)))
                        || Object.values(error.response.data)[0])
                ) || error.response
            return {
                code: error.response.data.code,
                data: error.response.data as IResponse,
                message,
                status: error.response.status,
                statusText: error.response.statusText,
            }
        } else {
            // todo: fix this
            return {
                code: 'Wrong Error response',
                data: {} as IResponse,
                message: 'Wrong Error response',
                status: 500,
                statusText: 'Wrong error',
            }
        }
    }

    protected Legacy: boolean = false
    protected ResourceOnce!: string
    protected Resource!: string
    private settings: Settings

    constructor(settings: Settings) {
        super()
        this.settings = settings
    }

    protected GetRequest<T>(id: number | string): IPodiumPromise<T> {
        const request: AxiosRequestConfig = {
            method: 'get',
        }
        return this.Request(request, `${this.makeURL()}/${id}`)
    }

    protected DeleteRequest<T>(id: number | string): IPodiumPromise<T> {
        const request: AxiosRequestConfig = {
            method: 'delete',
        }
        return this.Request(request, this.makeURL(id))
    }

    protected ListRequest<F, T>(filter?: Filter<F>, paginator?: Paginator): IPodiumPromise<T> {
        let params = {}
        if (filter instanceof Filter) {
            filter.setLegacyMode(this.Legacy)
            params = Object.assign(params, filter.toParams())
        }
        if (paginator instanceof Paginator) {
            paginator.setLegacyMode(this.Legacy)
            params = Object.assign(params, paginator.toParams())
        }

        const request: AxiosRequestConfig = {
            method: 'get',
            params,
        }
        return this.Request(request, this.makeURL())
    }

    protected PostRequest<T>(data: object = {}): IPodiumPromise<T> {
        const request: AxiosRequestConfig = {
            data,
            method: 'post',
        }
        return this.Request(request, this.makeURL())
    }

    protected UpdateRequest<T>(id: number | string, data: object): IPodiumPromise<T> {
        const request: AxiosRequestConfig = {
            data,
            method: 'put',
        }
        return this.Request(request, this.makeURL(id))
    }

    protected Request<T>(config: AxiosRequestConfig, url?: string): IPodiumPromise<T> {
        if (!url) {
            url = this.makeURL()
        }
        if ((this.Resource !== 'authenticate') && !this.HasToken()) { // Don't even make the request
            return new Promise((resolve, reject) => {
                reject(API_CODE.INVALID_TOKEN)
            })
        }

        if (typeof config.data === 'object') {
            const convertTimeToAPI = new ConvertTime(config.data)
            config.data = convertTimeToAPI.ToAPI()
        }

        config = Object.assign({
            headers: this.makeHeaders(),
            transformResponse: [(data: string) => {
                const convertTimeToUTC = new ConvertTime(JSON.parse(data))
                return convertTimeToUTC.ToUTC()
            }],
        }, config)

        return new Promise((resolve, reject) => {
            // @ts-ignore
            return axios(url, config)
                .then((response: AxiosResponse) => {
                    resolve(response.data)
                })
                .catch((error: AxiosError) => {
                    const parsedError = Request.parseError(error)
                    if (
                        parsedError
                        && (parsedError.status === 401)
                        && (parsedError.code === API_CODE.INVALID_TOKEN)) {
                        Token.getInstance().RemoveToken()
                    }
                    this.onRequestError(parsedError)
                    reject(parsedError)
                })
        })
    }

    protected makeURL(id?: number | string, postfix?: string): string {
        let endpoint = this.settings.getEndpoint()
        if (!endpoint.endsWith('/')) {
            endpoint += '/'
        }
        const version = this.settings.getVersion()
        const resource = this.ResourceOnce || this.Resource
        // this.ResourceOnce = null

        let build = `${endpoint}v${version}/${resource}`
        if (id) {
            build += `/${id}`
        }
        if (postfix) {
            build += `/${postfix}`
        }
        return build
    }

    private makeHeaders(): { Authentication: (string | null) } {
        return {
            Authentication: this.GetToken(),
        }
    }

    private onRequestError(errorData: IPodiumErrorResponse): void {
        this.settings.getOnRequestError()(errorData)
    }

}
