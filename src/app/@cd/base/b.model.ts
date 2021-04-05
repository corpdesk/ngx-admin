export interface UpdateFilterItem {
    field: string;
    operator: string;
    val: string;
}

// format for querying search via corpdesk api
export interface CdFilter {
    field?: string;
    operator: string;
    val?: any;
    fieldType?: string;
    jField?: string;
    jPath?: string; // example "$.user_id"
    jVal?: any;
}