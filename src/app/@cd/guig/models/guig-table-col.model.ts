export interface GuigTableCol {
        index: number;
        name: string;
        map?: string;
        dataType?: string;
        icon?: string;
        controlType: string;
        action?: string;
        editable?: boolean;
        disabled?: boolean;
        hide?: boolean;
        alt?: any[];
}

export interface GuigTableConfig {
    columns: GuigTableCol[];
}