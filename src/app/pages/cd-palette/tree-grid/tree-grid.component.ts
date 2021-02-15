import { Component, AfterViewInit, Input } from '@angular/core';
import { async } from '@angular/core/testing';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { GroupMemberService } from '../../../@cd/sys/user/controllers/group-member.service';
import { TreeHelperService } from '../../../@cd/guig/tree-helper';
import { CdFilter } from '../../../@cd/base/b.model';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  editable: string;
  val: string;
  items?: number;
}

interface MenuField {
  name: string;
  val: string;
  editable: boolean;
  dataType?: string;
  kind: string;
}

interface GroupMember {
  member_name: string,
  group_member_id: number,
  member_guid: string,
  group_guid_parent: string,
  cd_obj_type_id: number,
  kind: string;
}

interface Node {
  data: GroupMember;
  children?: GroupMember[];
}

@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss'],
})
export class TreeGridComponent implements AfterViewInit {
  // customColumn = 'name';
  // defaultColumns = ['val', 'editable', 'dataType', 'kind'];
  // allColumns = [this.customColumn, ...this.defaultColumns];

  customColumn = 'member_name';
  defaultColumns = ['group_member_id', 'member_guid', 'group_guid_parent', 'cd_obj_type_id'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private svGroupMember: GroupMemberService,
    private svTreeHelper: TreeHelperService,
  ) {

    const filter: CdFilter[] = [
      {
        field: 'group.enabled',
        operator: '=',
        val: 1
      }
    ];
    this.svGroupMember.getGroupMemberObsv(filter).subscribe((resp: any) => {
      console.log('getGroupMemberObsv/resp:', resp);
      const root = this.svTreeHelper.getRoot(resp.data);
      console.log('root:', root);
      this.groups = root;
      this.dataSource = this.dataSourceBuilder.create(this.groups);
    });

  }

  ngAfterViewInit() {
    let element = document.getElementById('search') as HTMLElement;
    element.classList.remove('size-medium');
    element.classList.add('size-small');
  }

  async setGroups(rootGroups: TreeNode<GroupMember>[]) {
    console.log('starting setGroups(rootGroups: TreeNode<GroupMember>[])');
    console.log('rootGroups:', rootGroups);
    this.groups = [];
    let group = { data: null, children: [] }
    rootGroups.forEach(async (groupMember: any) => {
      console.log('setGroups/groupMember:', groupMember);
      const parentGuid = groupMember.group_guid_parent;
      console.log('setGroups/parentGuid:', parentGuid);
      group.data = groupMember;
      group.children.push(await this.getGroupMembers(parentGuid, group));
      console.log('setGroups/group:', group);
      // this.groups.push({data: groupMember, children: group.children});
    });
    console.log('this.groups:', await this.groups);
    this.dataSource = await this.dataSourceBuilder.create(await this.groups);
  }

  async getGroupMembers(parentGuid, group: TreeNode<GroupMember>) {
    console.log('starting getGroupMembers(parentGuid)');
    // let members = [];
    let members = await this.svGroupMember.getGroupMemberObsv(parentGuid).subscribe((resp: any) => {
      console.log('getGruopMembers::resp:', resp);
      // members.push(resp.data);
      // this.dataSource = this.dataSourceBuilder.create(this.groups);
      group.children = resp.data;
      this.groups.push(group);
      console.log('getGroupMembers/this.groups:', this.groups)
      return resp.data;
    })
    console.log('getGroupMembers/members:', await members);
    return await members;
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  private data: TreeNode<MenuField>[] = [
    {
      data: { name: 'menu_id', val: 'menu_id', editable: false, dataType: 'number', kind: 'dir' },
      children: [
        { data: { name: 'name', val: 'menu_id', editable: true, dataType: 'string', kind: 'doc' } },
        { data: { name: 'alias', val: 'menu_id', editable: false, dataType: 'string', kind: 'doc' } },
        { data: { name: 'isCustom', val: '0', editable: false, dataType: 'boolean', kind: 'txt' } },
        { data: { name: 'active', val: '1', editable: false, dataType: 'boolean', kind: 'txt' } },
      ],
    },
    {
      data: { name: 'menu_name', val: 'menu_name', editable: false, dataType: 'string', kind: 'dir' },
      children: [
        { data: { name: 'name', val: 'doc', editable: false, dataType: 'string', kind: 'doc' } },
        { data: { name: 'alias', val: 'doc', editable: false, dataType: 'string', kind: 'doc' } },
        { data: { name: 'isCustom', val: 'txt', editable: false, dataType: 'boolean', kind: 'txt' } },
        { data: { name: 'active', val: 'docx', editable: false, dataType: 'boolean', kind: 'txt' } },
      ],
    },
    {
      data: { name: 'menu_icon', val: 'icon', editable: false, dataType: 'string', kind: 'dir' },
      children: [
        { data: { name: 'name', val: 'doc', editable: false, dataType: 'string', kind: 'doc' } },
        { data: { name: 'alias', val: 'doc', editable: false, dataType: 'string', kind: 'doc' } },
        { data: { name: 'isCustom', val: 'txt', editable: false, dataType: 'boolean', kind: 'txt' } },
        { data: { name: 'active', val: 'docx', editable: false, dataType: 'boolean', kind: 'txt' } },
      ],
    },
  ];

  private groups: TreeNode<GroupMember>[] = [
    {
      data: { member_name: 'System Admins', group_member_id: 40, member_guid: '5D865522-6', group_guid_parent: 'AAAAAAAAA-1', cd_obj_type_id: 17, kind: 'dir' },
      children: [
        { data: { member_name: 'GRP_01_L0', group_member_id: 130, member_guid: 'A4F4FE26-B', group_guid_parent: '5D865522-6', cd_obj_type_id: 10, kind: 'dir' } },
        { data: { member_name: 'can_create_group', group_member_id: 222, member_guid: '79F88510-E', group_guid_parent: '5D865522-6', cd_obj_type_id: 10, kind: 'dir' } },
        { data: { member_name: 'ddd', group_member_id: 255, member_guid: '93196B43-C', group_guid_parent: '5D865522-6', cd_obj_type_id: 10, kind: 'dir' } },
        { data: { member_name: 'my_group', group_member_id: 256, member_guid: 'F9179B8D-5', group_guid_parent: '5D865522-6', cd_obj_type_id: 10, kind: 'dir' } },
      ],
    },
    {
      data: { member_name: 'Application Managers', group_member_id: 41, member_guid: '9D7144EA-2', group_guid_parent: 'AAAAAAAAA-1', cd_obj_type_id: 17, kind: 'dir' },
      children: [],
    },
    {
      data: { member_name: 'Company Admins', group_member_id: 42, member_guid: '9784234D-4', group_guid_parent: 'AAAAAAAAA-1', cd_obj_type_id: 17, kind: 'dir' },
      children: [
        { data: { member_name: 'Application Managers', group_member_id: 133, member_guid: '9D7144EA-2', group_guid_parent: '9784234D-4', cd_obj_type_id: 10, kind: 'dir' } },
        { data: { member_name: 'Executive Director', group_member_id: 129280, member_guid: '860CCC6C-E01F-73C8-1FA4-3DB6F091DA1B', group_guid_parent: '9784234D-4', cd_obj_type_id: 10, kind: 'dir' } },
        { data: { member_name: 'Chief Accountant', group_member_id: 129281, member_guid: 'A81BFDF6-27A6-86D6-1955-208CF20024D8', group_guid_parent: '9784234D-4', cd_obj_type_id: 10, kind: 'dir' } },
        { data: { member_name: 'Human Resource Manager', group_member_id: 129282, member_guid: 'E01F453B-41C2-506F-9DA0-0A945E77479D', group_guid_parent: '9784234D-4', cd_obj_type_id: 10, kind: 'dir' } },
      ],
    },
    {
      data: { member_name: 'Private', group_member_id: 43, member_guid: '645730F0-3', group_guid_parent: 'AAAAAAAAA-1', cd_obj_type_id: 17, kind: 'dir' },
      children: [
        { data: { member_name: 'GRP_01_L0', group_member_id: 240, member_guid: 'A4F4FE26-B', group_guid_parent: '9784234D-4', cd_obj_type_id: 10, kind: 'dir' } },
      ],
    }
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  corrugate(data) {
    let root = '';
    return data.reduce((t, o) => {
      o.id === o.pid && (root = o.id);
      t[o.id] ? t[o.id].name = o.name
        : t[o.id] = { id: o.id, name: o.name };
      t[o.pid] ? o.pid !== o.id ? t[o.pid].children.push(t[o.id])
        : t[o.pid].children = t[o.pid].children || []
        : t[o.pid] = { id: o.pid, children: [t[o.id]] };
      return t;
    }, {})[root];
  }

  unflatten(arr) {
    var tree = [],
      mappedArr = {},
      arrElem,
      mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for (var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]['children'] = [];
    }


    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parentid) {
          mappedArr[mappedElem['parentid']]['children'].push(mappedElem);
        }
        // If the element is at the root level, add it to first level elements array.
        else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  }

  /////////////////////////
  findParent(arr, diagId) {
    return arr.find((parent) => parent.DIAGID === diagId);
  }

  createTreeNode(value) {
    return {
      label: value.DIAGNOSIS,
      value: value.DIAGID,
      children: (value.children !== undefined)
        ? value.children.map(this.createTreeNode)
        : undefined
    };
  }

  createTree(data) {
    return data
      // first restructure existing nodes as a tree
      .reduce((result, value, index, originalArray) => {
        if (value.PARENTID !== null) {
          const parent = this.findParent(originalArray, value.PARENTID);

          if (parent) {
            // add as child if has parent
            parent.children = (parent.children || []).concat(value);
          }

          return result;
        } else {
          // Add value to top level of the result array
          return result.concat(value);
        }
      }, [] /* Initialize with empty result array */)
      // them map to new data type
      .map(this.createTreeNode);
  }

  setTree(flatData) {
    function findParent(arr, diagId) {
      return arr.find((parent) => parent.DIAGID === diagId);
    }

    function createTreeNode(value) {
      return {
        label: value.DIAGNOSIS,
        value: value.DIAGID,
        children: (value.children !== undefined)
          ? value.children.map(createTreeNode)
          : undefined
      };
    }

    function createTree(data) {
      return data
        // first restructure existing nodes as a tree
        .reduce((result, value, index, originalArray) => {
          if (value.PARENTID !== null) {
            const parent = findParent(originalArray, value.PARENTID);

            if (parent) {
              // add as child if has parent
              parent.children = (parent.children || []).concat(value);
            }

            return result;
          } else {
            // Add value to top level of the result array
            return result.concat(value);
          }
        }, [] /* Initialize with empty result array */)
        // them map to new data type
        .map(createTreeNode);
    }

    const tree = createTree(flatData);
    console.log(tree);
    return tree;
  }
  /////////////////////////

  /**
   * Convert the data format of JSON arrays such as id and parentId to tree node format
 * @param {Array} arr
 * @param {String} id
 * @param {String} pid
 * @return {Array}
 */
  arrayToTree(arr, id, pid) {
    let data = JSON.parse(JSON.stringify(arr));
    if (!data || !data.length) return [];
    let targetData = []; // container for storing data (return)
    let records = {};
    let itemLength = data.length; //Number of data collections
    for (let i = 0; i < itemLength; i++) {
      let o = data[i];
      records[o[id]] = o;
    }
    for (let i = 0; i < itemLength; i++) {
      let currentData = data[i];
      let parentData = records[currentData[pid]];
      if (!parentData) {
        targetData.push(currentData);
        continue;
      }
      parentData.children = parentData.children || [];
      parentData.children.push(currentData);
    }
    return targetData;
  }

  arrayToTreeV2(arr, id, pid) {
    let d = JSON.parse(JSON.stringify(arr));
    if (!d || !d.length) return [];
    let targetData = []; // container for storing data (return)
    let records = {};
    let itemLength = d.length; //Number of data collections
    for (let i = 0; i < itemLength; i++) {
      let o = d[i];
      records[o[id]] = o;
    }
    for (let i = 0; i < itemLength; i++) {
      let currentData: Node = { data: d[i] };
      let parentData = records[currentData.data[pid]];
      if (!parentData) {
        console.log('currentData:', currentData);
        if ('children' in currentData) {
          console.log('is ok');
        } else {
          if ('children' in currentData.data) {
            // move currentData.data.children to currentData.children
            currentData.children = currentData.data['children'];
            delete currentData.data['children'];
          }
        }
        targetData.push(currentData);
        continue;
      }
      console.log('parentData:', parentData);
      delete parentData.cd_obj_type_id;
      delete parentData.group_guid_parent;
      delete parentData.group_member_id;
      delete parentData.member_guid;
      delete parentData.member_name;
      parentData.children = parentData.children || [];
      parentData.data = parentData;
      parentData.children.push(currentData);
    }

    targetData = targetData.filter((g) => {
      if ('children' in g) {
        return g;
      }
    });
    return targetData;
  }

  /**
 * Convert an array to tree structure data
 *
 * @export
 * @param {Array} array
   * @param {Object} parent parent node
 * @param {Array} tree
 * @return {Array}
 */
  array2tree(array, parent = { id: 0 }, tree = []) {
    let treeData = tree
    const children = array.filter(array, function (child) {
      return child.parentId === parent.id
    })
    if (!array.isEmpty(children)) {
      if (parent.id === 0) {
        treeData = children
      } else {
        parent['children'] = children
      }
      array.each(children, function (child) {
        this.array2tree(array, child)
      })
    }
    return treeData
  }

  //////////////////////////////
  getRoot(groups: GroupMember[]) {
    let ret = groups.filter((g) => {
      if (g.cd_obj_type_id == 17) {
        return g;
      }
    });

    let root = ret.map((g) => {
      return { data: g, children: [] };
    });

    root.forEach((parent, i) => {
      root[i].children = this.getChildren(parent, groups);
    });
    return root;
  }

  getChildren(parent: Node, groups: GroupMember[]): any {
    // if (parent.data.member_guid == '79F88510-E') {
    //   console.log('parent.data.member_guid,getChildren/parent:', parent);
    // }
    // const nodeChildren = [];
    /**
     * filter children from the group
     */
    let children: any = groups.filter((g) => {
      // console.log('getChildren/:parent', parent);
      if (g.group_guid_parent == parent.data.member_guid) {
        return g;
      }
    })
      /**
       * map the result into nodes
       */
      .map((g) => {
        return { data: g, children: [] };
      });

    // if (parent.data.member_guid == '5D865522-6') {
    //   console.log('parent.data.member_guid, getChildren/parent:', parent);
    //   console.log('parent.data.member_guid, /children:', children);
    // }

    /**
     * return with grand children if it hasChildren
     */
    return children.map((g: Node) => {
      // if (parent.data.member_guid == '5D865522-6') {
      //   console.log('parent.data.member_guid, g:', g);
      // }
      let member = g;

      /**
       * check if member hasChildren, 
       */
      let hasChildren = groups.filter((g) => {
        if (g.group_guid_parent == member.data.member_guid) {
          return g;
        }
      });
      if (hasChildren.length > 0) {
        /**
         * if hasChildren, dig deeper for grandchildren 
         */
        return this.getChildren(g, groups);
      } else {
        /**
         * if hasChildren is negative, then return as is
         */
        return g;
      }

    });
  }


}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]='expanded' *ngIf='isDir(); else fileIcon'>
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon='file-text-outline'></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: number;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 10 || this.kind === 17;
    // return this.kind === 'dir';
  }
}