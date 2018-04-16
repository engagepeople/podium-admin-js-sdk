import {ISettings} from '../../../types/index'
import {PodiumResource} from '../../Podium/PodiumResource'

export class Flex extends PodiumResource {

    constructor(settings: ISettings) {
        super('admin/adhoc_campaign', settings)
    }

}
