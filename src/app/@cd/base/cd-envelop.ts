
// cd request format
export interface CdRequest {
    ctx: string;
    m: string;
    c: string;
    a: string;
    dat: object;
    args: object;
}

// cd response format
export interface CdResponse {
    app_state: {
        success: number;
        info: {
            messages: string,
            code: number,
            app_msg: any,
        };
        sess: {
            cd_token: string,
            jwt: string,
            p_sid: string,
            ttl: number
        };
        cache: object;
    };
    data: [];
}
