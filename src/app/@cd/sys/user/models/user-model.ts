
export interface User {
    user_id?: number;
    user_guid?: string;
    username: string;
    email: string;
    password: string;
    mobile?: string;
}

export class mUser {
    username: string;
    email: string;
    password: string;
    cPassword: string;
}

export class LoginModel {
    public username: string;
    public password: string;
    constructor(
    ) { }
}

export class RegModel {
    public fname: string;
    public lname: string;
    public email: string;
    public mobile: string;
    public username: string;
    public password: string;
    public cPassword: string;
    public company_id: string;
    constructor(
    ) { }
}

export interface Resp {
    app_state: any;
    data: any;
}
