import {ISettings} from '../../types'
import {PodiumResource} from '../Podium/PodiumResource'

export class Users extends PodiumResource {

    constructor(settings: ISettings) {
        super(settings)
        super.Resource = 'user'
        super.Legacy = true
    }
}
