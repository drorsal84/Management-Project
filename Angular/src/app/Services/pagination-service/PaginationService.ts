import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PaginationService {

    public pageSizeArray = [ // Pagination page size array.
        { value: 5, label: '5' },
        { value: 10, label: '10' },
        { value: 15, label: '15' },
        { value: 20, label: '20' },
        { value: 25, label: '25' },
        { value: 50, label: '50' },
        { value: 100, label: '100' },
    ];

    public page: number = 1; // First page in the pagination.
    public pageSize: number = 10; // Number of product shown per page in pagination.
}