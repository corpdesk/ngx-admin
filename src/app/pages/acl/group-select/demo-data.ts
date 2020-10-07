
export interface Group {
  group_id: number;
  group_guid?: string;
  group_name?: string;
  group_description?: string;
  group_owner_id?: string;
  doc_id?: number;
  group_type_id?: number;
  module_guid?: string;
  company_id?: number;
}

export interface NestedGroup {
  group_id: number;
  group_guid?: string;
  group_name?: string;
  group_description?: string;
  group_owner_id?: string;
  doc_id?: number;
  group_type_id?: number;
  module_guid?: string;
  company_id?: number;
}


/** list of groups */
export const GROUPS: Group[] = [
  { group_name: 'moduleman', group_id: 2001 },
  { group_name: 'coops', group_id: 2002 },
  { group_name: 'admin', group_id: 2003 },
  { group_name: 'foo02', group_id: 2004 },
  { group_name: 'accts', group_id: 2005 },
  { group_name: 'hrm', group_id: 2006 },
  { group_name: 'root', group_id: 2007 },
  { group_name: 'accosca-root', group_id: 2008 },
  { group_name: 'emp-root', group_id: 2009 },
];

