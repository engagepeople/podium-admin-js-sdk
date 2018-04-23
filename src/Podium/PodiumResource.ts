import {IPodiumPaginator, IPodiumPromise, ISettings} from '../../types'
import {PodiumRequest} from './PodiumRequest'
import {Filter} from './Filter'
import {Paginator} from './Paginator'

export class PodiumResource extends PodiumRequest {

    constructor(settings: ISettings) {
        super(settings)
    }

    public Get<T>(id: number|string): IPodiumPromise<T> {
        return super.GetRequest(id)
    }

    public List<T, F>(params?: Filter<F>, paginator?: | Paginator): IPodiumPromise<IPodiumPaginator<T>> {
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
