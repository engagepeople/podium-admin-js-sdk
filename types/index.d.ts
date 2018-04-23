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
    detail: IUser
    token: string
}

export interface ILogoutResponse {
    code: API_CODE
    id: object
    message: string
}

export interface IPodiumPaginator<T> {
    readonly current_page: number
    readonly data: T[]
    readonly last_page: number
    readonly per_page: number
    readonly to: number
    readonly total: number
}

export interface IPodiumModel {
    readonly id: number
    readonly created_at: Date
    readonly updated_at: Date
}

export interface IUser extends IPodiumModel {
    first_name: string
    last_name: string
    user_account: string
    email: string
}

export interface IFlex extends IPodiumModel {
    readonly id: number
    program_id: number
    rules: IFlexRule[]
}

export interface IFlexRule {
    id: number
    name: string
    reward_id: number
    slug: string
}

export interface IUserFilter {
    customer_id?: number
    search?: string
    email?: string
    group_ids?: number
    only_managers?: boolean
}

export interface IReward extends IPodiumModel {
    choice_selections: [number]
    incentives: [number]
    notification_map: [number]
    product_assets: [number]
    program_id: number
}

export const enum API_CODE {
    INVALID_TOKEN = 'INVALID_TOKEN',
    SYSTEM_ACCOUNT_FOUND = 'SYSTEM_ACCOUNT_FOUND',
    SYSTEM_ACCOUNT_NOT_FOUND = 'SYSTEM_ACCOUNT_NOT_FOUND',
}

export const enum PAGE_DIRECTION {
    ASC = 'asc',
    DESC = 'desc',
}
