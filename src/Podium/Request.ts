import axios, {AxiosError, AxiosRequestConfig} from 'axios'
import {API_CODE, IPodiumErrorResponse, IPodiumPromise, IResponse, ISettings} from '../../types'
import {ConvertTime} from './ConvertTime'
import {Filter} from './Filter'
import {Token} from './Token'
import {Paginator} from './Paginator'

export class Request extends Token {
    protected Legacy: boolean = false
    protected Resource: string
    private settings: ISettings

    constructor(settings: ISettings) {
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
            return axios(url, config)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(this.catchError(error))
                })
        })
    }

    private makeURL(id?: number | string): string {
        let build = this.settings.endpoint + this.Resource
        if (id) {
            build += `/${id}`
        }
        return build
    }

    private makeHeaders(): object {
        if (this.GetToken()) {
            return {
                Authorization: 'Bearer ' + this.GetToken(),
            }
        }
    }

    private catchError(error: AxiosError): IPodiumErrorResponse {
        const podiumError: IPodiumErrorResponse = {
            data: error.response.data as IResponse,
            status: error.response.status,
            statusText: error.response.statusText,
        }

        if ((podiumError.status === 400) && (podiumError.data.apiCode === API_CODE.INVALID_TOKEN)) {
            this.RemoveToken()
        }

        return podiumError
    }

}
