import { Component, AfterViewInit, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

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

@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss'],
})
export class TreeGridComponent implements AfterViewInit {
  customColumn = 'name';
  defaultColumns = [ 'val', 'editable', 'dataType', 'kind' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

ngAfterViewInit(){
  let element = document.getElementById('search') as HTMLElement;
  element.classList.remove('size-medium');
  element.classList.add('size-small');
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
        { data: { name: 'name', val: 'menu_id', editable: true, dataType: 'string', kind: 'doc'  } },
        { data: { name: 'alias', val: 'menu_id', editable: false, dataType: 'string', kind: 'doc'  } },
        { data: { name: 'isCustom', val: '0', editable: false, dataType: 'boolean', kind: 'txt'  } },
        { data: { name: 'active', val: '1', editable: false, dataType: 'boolean', kind: 'txt'  } },
      ],
    },
    {
      data: { name: 'menu_name', val: 'menu_name', editable: false, dataType: 'string', kind: 'dir'  },
      children: [
        { data: { name: 'name', val: 'doc', editable: false, dataType: 'string', kind: 'doc'  } },
        { data: { name: 'alias', val: 'doc', editable: false, dataType: 'string', kind: 'doc'  } },
        { data: { name: 'isCustom', val: 'txt', editable: false, dataType: 'boolean', kind: 'txt'  } },
        { data: { name: 'active', val: 'docx', editable: false, dataType: 'boolean', kind: 'txt'  } },
      ],
    },
    {
      data: { name: 'menu_icon', val: 'icon', editable: false, dataType: 'string', kind: 'dir'  },
      children: [
        { data: { name: 'name', val: 'doc', editable: false, dataType: 'string', kind: 'doc'  } },
        { data: { name: 'alias', val: 'doc', editable: false, dataType: 'string', kind: 'doc'  } },
        { data: { name: 'isCustom', val: 'txt', editable: false, dataType: 'boolean', kind: 'txt'  } },
        { data: { name: 'active', val: 'docx', editable: false, dataType: 'boolean', kind: 'txt'  } },
      ],
    },
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}