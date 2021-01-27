export interface UpdateFilterItem {
    field: string;
    operator: string;
    val: string;
}

// format for querying search via corpdesk api
export interface CdFilter {
    field: string,
    operator: string,
    val: any
}