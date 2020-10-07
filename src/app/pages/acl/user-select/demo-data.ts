
export interface User {
  user_id: number;
  user_guid?: string;
  username?: string;
  password?: string;
  email?: string;
  co_id?: number;
  doc_id?: number;
  mobile?: string;
  gender?: boolean;
  dateobirth?: string;
  postal_addr?: string;
  fname?: string;
  mname?: string;
  lname?: string;
  national_id?: string;
  passport_id?: string;
  Trusted?: boolean;
  ZipCode?: string;
  ActivationKey?: string;
  ProfessionID?: string;
  avatar?: string;
  theme_id?: string;
  signature_id?: string;
  timezone_id?: string;
  lang_id?: string;
  designation_id?: string;
  company_id?: string;
  user_type_id?: number;
  updated_at?: string;
  created_at?: string;
  temp?: string;

  }
  
  export interface UserGroup {
    username: string;
    users: User[];
  }
  
  
  /** list of users */
  export const USERS: User[] = [
    {username: 'zog', user_id: 1001},
    {username: 'karl', user_id: 1002},
    {username: 'blin', user_id: 1003},
    {username: 'kokoro', user_id: 1004},
    {username: 'manu', user_id: 1005},
    {username: 'widi', user_id: 1006},
    {username: 'luiz', user_id: 1007},
    {username: 'liki', user_id: 1008},
    {username: 'absalom', user_id: 1009},
    {username: 'bebe', user_id: 1010},
    {username: 'coco', user_id: 1011},
    {username: 'debi', user_id: 1012},
    {username: 'enet', user_id: 1013},
    {username: 'fopo', user_id: 1014},
    {username: 'guzi', user_id: 1015},
    {username: 'hamdi', user_id: 1016},
    {username: 'inta', user_id: 1017},
    {username: 'jomsa', user_id: 1018}
  ];
  
  /** list of user groups */
  export const USERGROUPS: UserGroup[] = [
    {
      username: 'Switzerland',
      users: [
        {username: 'User A', user_id: 2010},
        {username: 'User B', user_id: 2011}
      ]
    },
    {
      username: 'France',
      users: [
        {username: 'User C', user_id: 2012},
        {username: 'User D', user_id: 2013},
        {username: 'User E', user_id: 2014},
      ]
    },
    {
      username: 'Italy',
      users: [
        {username: 'User F', user_id: 2015},
        {username: 'User G', user_id: 2016},
        {username: 'User H', user_id: 2017},
        {username: 'User I', user_id: 2018},
        {username: 'User J', user_id: 2019},
      ]
    },
    {
      username: 'United States of America',
      users: [
        {username: 'User Kolombia', user_id: 2020},
      ]
    },
    {
      username: 'Germany',
      users: [
        {username: 'User L', user_id: 2021},
        {username: 'User M', user_id: 2022},
        {username: 'User N', user_id: 2023},
        {username: 'User O', user_id: 2024},
        {username: 'User P', user_id: 2025},
        {username: 'User Q', user_id: 2026},
        {username: 'User R', user_id: 2027}
      ]
    }
  ];
  