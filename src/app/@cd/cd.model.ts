

export const ENDPOINT_APPS = `http://${window.location.host}/`;

export interface PostData {
    ctx: string;
    m: string;
    c: string;
    a: string;
    dat: {
        token: string;
    },
    args: {};
}

export interface CdResponse {
    app_state: {
        success: boolean;
        info: {
            messages: string;
            code: number;
            app_msg: [];
        },
        sess: [];
        cache: { dat_scope: number }
    };
    data: [];
}