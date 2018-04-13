import axios, {AxiosError, AxiosRequestConfig} from 'axios'
import {API_CODE, IAuthResponse, IPodiumErrorResponse, IPodiumPromise, IResponse, ISettings} from '../../types'
import {ConvertTime} from './ConvertTime'
import {Paginator} from './Paginator'
import {Token} from './Token'

export class PodiumRequest extends Token {
    protected Legacy: boolean = false
    protected Paginator: Paginator
    private settings: ISettings
    private ConvertTime: ConvertTime

    constructor(settings: ISettings) {
        super()
        this.settings = settings
        this.ConvertTime = new ConvertTime()
    }

    protected GetRequest<T>(resource: string, params: object = {}): IPodiumPromise<T> {
        if (this.Paginator instanceof Paginator) {
            this.Paginator.setLegacyMode(this.Legacy)
            params = Object.assign(params, this.Paginator.toParams())
        }

        const request: AxiosRequestConfig = {
            method: 'get',
            params,
        }
        return this.Request(resource, request)
    }

    protected PostRequest<T>(resource: string, data?: object): IPodiumPromise<T> {
        const request: AxiosRequestConfig = {
            data,
            method: 'post',
        }
        return this.Request(resource, request)
    }

    protected AuthenticateRequest(username: string, password: string): IPodiumPromise<IAuthResponse> {
        return this.PostRequest<IAuthResponse>('authenticate', {
            password,
            type: 'system',
            user_account: username,
        }).then((response) => {
            this.SetToken(response.token)
            return response
        })
    }

    protected Request<T>(resource: string, config: AxiosRequestConfig): IPodiumPromise<T> {
        if ((resource !== 'authenticate') && !this.HasToken()) { // Don't even make the request
            return new Promise((resolve, reject) => {
                reject(API_CODE.INVALID_TOKEN)
            })
        }

        config = Object.assign({
            headers: this.makeHeaders(),
            transformResponse: [(data: string) => {
                return this.ConvertTime.APIToUTC(JSON.parse(data))
            }],
        }, config)

        return new Promise((resolve, reject) => {
            return axios(this.makeUrl(resource), config)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    this.catchError(error)
                    reject(error)
                })
        })
    }

    private makeUrl(path: string): string {
        return this.settings.endpoint + path
    }

    private makeHeaders(): object {
        if (this.GetToken()) {
            return {
                Authentication: this.GetToken(),
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
        throw podiumError
    }

}
