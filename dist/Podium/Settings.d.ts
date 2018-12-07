import { API_LOCALE, IPodiumErrorResponse } from '../../types';
export declare class Settings {
    private APIVersions;
    private settings;
    setVersion(version: number): Settings;
    getVersion(): number;
    setLocale(locale: API_LOCALE): Settings;
    getLocale(): string;
    setEndpoint(endpoint: string): Settings;
    getEndpoint(): string;
    setOnRequestError(callback: (error: IPodiumErrorResponse) => void): Settings;
    getOnRequestError(): ((error: IPodiumErrorResponse) => void);
}
