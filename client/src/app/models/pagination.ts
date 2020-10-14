import { IProduct } from './product';

export interface Pagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IProduct[];
}
