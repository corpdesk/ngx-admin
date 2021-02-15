import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { GroupMemberNode } from '../../../@cd/sys/user/models/gruoup-member-model';
import { GroupMemberService } from '../../../@cd/sys/user/controllers/group-member.service';
import { GroupService } from '../../../@cd/sys/user/controllers/group.service';
import { TreeHelperService } from '../../../@cd/guig/tree-helper';
import { CdFilter } from '../../../@cd/base/b.model';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Fruit loops' },
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          { name: 'Broccoli' },
          { name: 'Brussels sprouts' },
        ]
      }, {
        name: 'Orange',
        children: [
          { name: 'Pumpkins' },
          { name: 'Carrots' },
        ]
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'ngx-tree-view-mat',
  templateUrl: './tree-view-mat.component.html',
  styleUrls: ['./tree-view-mat.component.scss']
})
export class TreeViewMatComponent implements OnInit {
  private _transformer = (node: GroupMemberNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.member_name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  groups;

  constructor(
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
      const groupTree = this.svTreeHelper.toTree(resp.data, 'member_guid', 'group_guid_parent');
      console.log('groupTree:', groupTree);
      this.dataSource.data = groupTree;
    });

  }

  ngOnInit(): void {
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
