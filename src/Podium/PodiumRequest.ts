import axios, {AxiosError, AxiosRequestConfig} from 'axios'
import {API_CODE, IAuthResponse, IPodiumErrorResponse, IPodiumPromise, IResponse, ISettings} from '../../types'
import {Token} from './Token'

export class PodiumRequest extends Token {
    private settings: ISettings

    constructor(settings: ISettings) {
        super()
        this.settings = settings
    }

    protected GetRequest<T>(resource: string, params?: object): IPodiumPromise<T> {
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

        // transformResponse (data) {
        //     return convertTime.APIToUTC(JSON.parse(data))
        // },

        // transformRequest: [function (data, headers) {
        //   return convertTime.UTCtoAPI(data)
        // }],

        config = Object.assign({headers: this.makeHeaders()}, config)

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
