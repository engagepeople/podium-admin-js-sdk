import {ISettings} from '../../types'
import {PodiumResource} from '../Podium/PodiumResource'

export class Rewards extends PodiumResource {

    constructor(settings: ISettings) {
        super(settings)
        super.Resource = 'admin/reward'
    }

}
