import {IPodiumPromise, ISettings} from '../../types'
import {Paginator} from './Paginator'
import {PodiumRequest} from './PodiumRequest'

export class PodiumResource extends PodiumRequest {

    public resource: string

    constructor(resource: string, settings: ISettings) {
        super(settings)
        this.resource = resource
    }

    public SetPaginator(paginator: Paginator): Paginator {
        this.Paginator = paginator
        return paginator
    }

    public Create<T>(params?: object): IPodiumPromise<T> {
        return super.PostRequest(this.resource, params)
    }

    public List<T>(params?: object): IPodiumPromise<T> {
        return super.GetRequest(this.resource, params)
    }

}
