import {ISettings} from '../../../types/index'
import {PodiumResource} from '../../Podium/PodiumResource'

export class Flex extends PodiumResource {

    constructor(settings: ISettings) {
        super(settings)
        super.Resource = 'admin/adhoc_campaign'
    }

}
