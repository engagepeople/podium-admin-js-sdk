import {API_LOCALE, IPodiumErrorResponse, ISettings} from '../../types'

export class Settings {

    private APIVersions: number[] = [1]
    private settings: ISettings = {
        endpoint: 'https://api.podiumrewards.com/',
        locale: API_LOCALE.EN_CA,
        onRequestError: (error: IPodiumErrorResponse) => {
            console.warn(error)
        },
        version: this.APIVersions[this.APIVersions.length - 1],
    }

    public setVersion(version: number): Settings {
        if (this.APIVersions.includes(version)) {
            this.settings.version = version
        } else {
            throw new Error(`Version ${version} does not exist in the API`)
        }
        return this
    }

    public getVersion(): number {
        return this.settings.version
    }

    public setLocale(locale: API_LOCALE): Settings {
        this.settings.locale = locale
        return this
    }

    public getLocale(): string {
        return this.settings.locale
    }

    public setEndpoint(endpoint: string): Settings {
        this.settings.endpoint = endpoint
        return this
    }

    public getEndpoint(): string {
        return this.settings.endpoint
    }

    public setOnRequestError(callback: (error: IPodiumErrorResponse) => void): Settings {
        this.settings.onRequestError = callback
        return this
    }

    public getOnRequestError(): ((error: IPodiumErrorResponse) => void) {
        return this.settings.onRequestError
    }

}
