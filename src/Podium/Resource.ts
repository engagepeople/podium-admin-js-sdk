import {IPodiumList, IPodiumPromise, ISettings} from '../../types'
import {Request} from './Request'
import {Filter} from './Filter'
import {Paginator} from './Paginator'

export class Resource extends Request {

    constructor(settings: ISettings) {
        super(settings)
    }

    public SetResource(resource: string): Resource {
        super.Resource = resource
        return this
    }

    public SetLegacy(legacy: boolean): Resource {
        super.Legacy = legacy
        return this
    }

    public Get<T>(id: number | string): IPodiumPromise<T> {
        return super.GetRequest(id)
    }

    public List<F, T>(arg1?: Filter<F> | Paginator, paginator?: | Paginator): IPodiumPromise<T[]> {
        let filter: Filter<F>
        if (arg1 instanceof Paginator) {
            if (paginator) {
                throw new TypeError('Order of parameters passed into List method must be Filter then Paginator')
            }
            paginator = arg1
            filter = null
        } else if (arg1 instanceof Filter) {
            filter = arg1
        }
        if (paginator instanceof Paginator) {
            paginator.isLoading(true)
        }
        return super.ListRequest(filter, paginator).then((rep: IPodiumList<T>): T[] => {
            if (paginator instanceof Paginator) {
                paginator.setResponse(rep.current_page, rep.from, rep.last_page, rep.per_page, rep.to, rep.total)
                paginator.isLoading(false)
            }
            return rep.data
        })
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
