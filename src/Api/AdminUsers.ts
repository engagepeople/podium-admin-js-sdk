import {IPodiumPaginator, IPodiumPromise, ISettings, IUserFilter} from '../../types'
import {Filter} from '../Podium/Filter'
import {PodiumResource} from '../Podium/PodiumResource'
import {Paginator} from '../Podium/Paginator'

export class Users extends PodiumResource {

    constructor(settings: ISettings) {
        super(settings)
        super.Resource = 'user'
        super.Legacy = true
    }

    public List<T, F>(params?: Filter<F>, paginator?: Paginator): IPodiumPromise<IPodiumPaginator<T>> {
        return super.List(params, paginator)
    }

}
