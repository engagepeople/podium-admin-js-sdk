import {PAGE_DIRECTION} from '../../types'
import {ListQuery} from './ListQuery'

export class Paginator extends ListQuery {
    private page: number = 1
    private perPage: number = 50
    private sortField: string = 'created_at'
    private sortDirection: PAGE_DIRECTION = PAGE_DIRECTION.DESC

    public setPage(page: number): Paginator {
        this.page = page
        return this
    }

    public setPerPage(perPage: number): Paginator {
        this.perPage = perPage
        return this
    }

    public setSortField(sortField: string): Paginator {
        this.sortField = sortField
        return this
    }

    public setSortDirection(direction: PAGE_DIRECTION): Paginator {
        this.sortDirection = direction
        return this
    }

    public setSortDesc(direction: boolean): Paginator {
        if (direction) {
            this.sortDirection = PAGE_DIRECTION.DESC
        } else {
            this.sortDirection = PAGE_DIRECTION.ASC
        }
        return this
    }

    public toParams(): object {
        const payload =  {
            count: this.perPage,
            page: this.page,
        }
        if (super.isLegacyMode()) {
            return Object.assign(payload, {
                sorting: {[this.sortField]: this.sortDirection},
            })
        } else {
            return Object.assign(payload, {
                sort_direction: this.sortDirection,
                sort_field: this.sortField,
            })
        }
    }
}
