import {ISettings} from '../../types'
import {PodiumResource} from '../Podium/PodiumResource'

export class Rewards extends PodiumResource {

    constructor(settings: ISettings) {
        super('admin/reward', settings)
    }

}
