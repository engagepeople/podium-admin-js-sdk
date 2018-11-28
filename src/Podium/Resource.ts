import {IPodiumList, IPodiumPromise, ISettings} from '../../types'
import {Request} from './Request'
import {Filter} from './Filter'
import {Paginator} from './Paginator'

export class Resource extends Request {

    constructor(settings: ISettings) {
        super(settings)
    }

    public SetResource(resource: string): Resource {
        this.Resource = resource
        return this
    }

    public SetLegacy(legacy: boolean): Resource {
        this.Legacy = legacy
        return this
    }

    public Get<T>(id: number|string): IPodiumPromise<T> {
        return this.GetRequest(id)
    }

    public List<F, T>(arg1?: Filter<F> | Paginator, paginator?: | Paginator): IPodiumPromise<IPodiumList<T>> {
        let filter: Filter<F> | undefined
        if (arg1 instanceof Paginator) {
            if (paginator) {
                throw new TypeError('Order of parameters passed into List method must be Filter then Paginator')
            }
            paginator = arg1
            filter = undefined
        } else if (arg1 instanceof Filter) {
            filter = arg1
        }
        return this.ListRequest(filter, paginator)
    }

    public Create<T>(params?: object): IPodiumPromise<T> {
        return this.PostRequest(params)
    }

    public Update<T>(id: number|string, params: object): IPodiumPromise<T> {
        return this.UpdateRequest(id, params)
    }

    public Delete<T>(id: number|string): IPodiumPromise<T> {
        return this.DeleteRequest(id)
    }

}
