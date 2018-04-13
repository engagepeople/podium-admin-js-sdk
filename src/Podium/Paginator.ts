import {API_CODE, PAGE_DIRECTION} from '../../types'

export class Paginator {
    private legacy: boolean = false
    private page: number = 1
    private perPage: number = 50
    private sortField: string = 'created_at'
    private sortDirection: PAGE_DIRECTION = PAGE_DIRECTION.DESC

    public setLegacyMode(mode: boolean): void {
        this.legacy = mode
    }

    public setPage(page: number): Paginator {
        this.page = page
        return this
    }

    public setPerPage(perPage: number): API_CODE {
        this.perPage = perPage
        return API_CODE.SYSTEM_ACCOUNT_FOUND
    }

    public setSortField(sortField: string): Paginator {
        this.sortField = sortField
        return this
    }

    public setSortDirection(direction: PAGE_DIRECTION): Paginator {
        this.sortDirection = direction
        return this
    }

    public setSortDesc(direction: PAGE_DIRECTION): Paginator {
        if (direction) {
            this.sortDirection = PAGE_DIRECTION.DESC
        } else {
            this.sortDirection = PAGE_DIRECTION.ASC
        }
        return this
    }

    public toParams(): object {
        if (this.legacy) {
            return {
                count: this.perPage,
                page: this.page,
                sorting: {[this.sortField]: this.sortDirection},
            }
        } else {
            return {
                count: this.perPage,
                page: this.page,
                sort_direction: this.sortDirection,
                sort_field: this.sortField,
            }
        }
    }
}
