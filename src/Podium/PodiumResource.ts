import {IPodiumPaginator, IPodiumPromise, ISettings} from '../../types'
import {Paginator} from './Paginator'
import {PodiumRequest} from './PodiumRequest'

export class PodiumResource extends PodiumRequest {

    constructor(settings: ISettings) {
        super(settings)
    }

    public Get<T>(id: number|string): IPodiumPromise<T> {
        return super.GetRequest(id)
    }

    public List<T>(params?: object, paginator?: Paginator): IPodiumPromise<IPodiumPaginator<T>> {
        return super.ListRequest(params, paginator)
    }

    public Create<T>(params?: object): IPodiumPromise<T> {
        return super.PostRequest(params)
    }

    public Update<T>(id: number|string, params?: object): IPodiumPromise<T> {
        return super.UpdateRequest(id, params)
    }

    public Delete<T>(id: number|string): IPodiumPromise<T> {
        return super.DeleteRequest(id)
    }

}
