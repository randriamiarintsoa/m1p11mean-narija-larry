export interface ListRequest {
    page?: number;
    limit?: number;
    searchValue?: string;
    searchFields?: Array<string>;
    ids?: Array<string>;
    sort?: Array<{key: string, ascendant: boolean}>;
}
export interface ListResult<T> {
  [x: string]: any;
    page: number;
    pages: number;
    rows: Array<T>;
    total: number;
}
export interface ListPagination {
    page: number;
    limit: number;
    total?: number;
    pageSizeOptions?: number[];
}
export interface SearchInterface {
    q?: string;
    selectedStatus?: string;
}
