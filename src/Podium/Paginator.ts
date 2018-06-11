import {SORT_DIRECTION, SORT_FIELD} from '../../types'
import {ListQuery} from './ListQuery'

export class Paginator extends ListQuery {
    private loading: boolean = false
    private page: number = 1
    private perPage: number = 50
    private sortField: SORT_FIELD = SORT_FIELD.CREATED_AT
    private sortDirection: SORT_DIRECTION = SORT_DIRECTION.DESC
    private response: {
        currentPage: number,
        from: number,
        lastPage: number,
        perPage: number,
        to: number,
        total: number,
    }

    constructor() {
        super()
        this.response = {
            currentPage: null,
            from: null,
            lastPage: null,
            perPage: null,
            to: null,
            total: null,
        }
    }

    public setResponse(currentPage: number,
                       from: number,
                       lastPage: number,
                       perPage: number,
                       to: number,
                       total: number): Paginator {
        this.response.currentPage = currentPage
        this.response.from = from
        this.response.lastPage = lastPage
        this.response.perPage = perPage
        this.response.to = to
        this.response.total = total
        return this
    }

    public isLoading(status: boolean): Paginator {
        this.loading = status
        return this
    }

    public setPage(page: number): Paginator {
        this.page = page
        return this
    }

    public setPerPage(perPage: number): Paginator {
        this.perPage = perPage
        return this
    }

    public setSort(field: SORT_FIELD, direction: SORT_DIRECTION): Paginator {
        this.sortField = field
        this.sortDirection = direction
        return this
    }

    public setSortField(field: SORT_FIELD): Paginator {
        this.sortField = field
        return this
    }

    public setSortDirection(direction: SORT_DIRECTION): Paginator {
        this.sortDirection = direction
        return this
    }

    public setSortDesc(direction: boolean): Paginator {
        if (direction) {
            this.sortDirection = SORT_DIRECTION.DESC
        } else {
            this.sortDirection = SORT_DIRECTION.ASC
        }
        return this
    }

    public toParams(): object {
        const payload = {
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
