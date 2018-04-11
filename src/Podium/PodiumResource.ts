import {IPodiumPromise, ISettings} from '../../types'
import {PodiumRequest} from './PodiumRequest'

export class PodiumResource extends PodiumRequest {

    public resource: string

    constructor(resource: string, settings: ISettings) {
        super(settings)
        this.resource = resource
    }

    public Create<T>(params?: object): IPodiumPromise<T> {
        return super.PostRequest(this.resource, params)
    }

    public List<T>(params?: object): IPodiumPromise<T> {
        return super.GetRequest(this.resource, params)
    }

}
