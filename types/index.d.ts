export interface ISettings {
    endpoint: string
}

export interface IPodiumError {
    data: object
    status: number
    statusText: string
}

export interface IPodiumErrorResponse {
    data: IResponse
    status: number
    statusText: string
}

export interface IPodiumPromise<T> extends Promise<T> {
    finally?: string
}

export interface IResponse {
    apiCode: API_CODE
    detail: object
    token: string
}

export interface IAuthResponse {
    apiCode: API_CODE
    detail: object
    token: string
}

export interface ILogoutResponse {
    code: API_CODE
    id: object
    message: string
}

export const enum API_CODE {
    INVALID_TOKEN = 'INVALID_TOKEN',
    SYSTEM_ACCOUNT_FOUND = 'SYSTEM_ACCOUNT_FOUND',
}

export const enum PAGE_DIRECTION {
    ASC = 'asc',
    DESC = 'desc',
}
