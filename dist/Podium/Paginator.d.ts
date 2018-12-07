import { SORT_DIRECTION, SORT_FIELD } from '../../types';
import { ListQuery } from './ListQuery';
export declare class Paginator extends ListQuery {
    private page;
    private perPage;
    private sortField;
    private sortDirection;
    setPage(page: number): Paginator;
    setPerPage(perPage: number): Paginator;
    setSort(field: SORT_FIELD, direction: SORT_DIRECTION): Paginator;
    setSortField(field: SORT_FIELD): Paginator;
    setSortDirection(direction: SORT_DIRECTION): Paginator;
    setSortDesc(direction: boolean): Paginator;
    toParams(): object;
}
