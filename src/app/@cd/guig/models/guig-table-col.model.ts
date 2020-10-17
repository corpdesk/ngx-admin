export interface GuigTableCol {
        index: number;
        name: string; // lable that is adopted for the table
        map?: string; // the field name apearing in the data (could be an alias as per the sql fetch)
        tField?:string; // the field name used for updating base table
        dataType?: string;
        icon?: string;
        controlType: string;
        action?: string;
        editable?: boolean;
        disabled?: boolean;
        hide?: boolean; // for visually hiding a column
        alt?: any[];
}

export interface GuigTableConfig {
    columns: GuigTableCol[];
}