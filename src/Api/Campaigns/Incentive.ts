import {ISettings} from '../../../types'
import {PodiumResource} from '../../Podium/PodiumResource'

export class Incentive extends PodiumResource {

    constructor(settings: ISettings) {
        super(settings)
        super.Resource = 'admin/incentive'
    }

}
