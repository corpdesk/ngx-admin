import { Component, OnInit, Input, ElementRef } from '@angular/core';


interface Stat {
  no: any;
  item: string;
}

interface Pair {
  first: Stat;
  second: Stat;
}

interface HeaderData {
  title: string;
  byLine: string;
  description: string;
  featureStats: Stat;
  stats: Stat[];
}

@Component({
  selector: 'ngx-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
  StatsPairs: Pair[] = [];
  @Input() headerData: HeaderData = {
    title: 'Project',
    byLine: 'date',
    description: '',
    featureStats: {
      no: '206 480',
      item: 'Sales in last 24h'
    },
    stats: [
      {
        no: 142,
        item: 'Projects'
      },
      {
        no: 22,
        item: 'Followers'
      },
      {
        no: 61,
        item: 'Comments'
      },
      {
        no: 44,
        item: 'Articles'
      },
      {
        no: 154,
        item: 'Tags'
      },
      {
        no: 32,
        item: 'Friends'
      }
    ]
  };
  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.setStatPairs();
  }

  setStatPairs() {
    console.log('starting addStat(s: Stat)');
    this.StatsPairs = [];
    let pair: Pair = {
      first: null,
      second: null,
    };
    this.headerData.stats.forEach((s: Stat, i) => {
      let j = i + 1;
      console.log('-------------------------------');
      console.log('i:', i);
      console.log('j:', j);
      console.log('this.headerData.stats.length:', this.headerData.stats.length)
      if (j % 2 == 0) {
        console.log('j is even');
        pair.second = s;
        console.log('saving:', pair);
        this.StatsPairs.push(pair);
      } else {
        console.log('j is odd');
        pair = {
          first: null,
          second: null,
        };
        pair.first = s;
        if (j == this.headerData.stats.length) {
          console.log('saving:', pair);
          this.StatsPairs.push(pair);
        }
      }
    });
    console.log('this.StatsPairs:', this.StatsPairs);
  }

  setStats() {
    console.log('starting setStats()');
    this.removeStats();
    this.setStatPairs();
    const elemTBody = this.elementRef.nativeElement.querySelector('#tStats') as HTMLElement;
    let htmlStats = '';
    console.log('this.StatsPairs:', this.StatsPairs);
    this.StatsPairs.forEach((row) => {
      if (row.second)
        htmlStats += `<tr class="row-stat">`;
      htmlStats += `   <td>
                              <span class="label label-success">${row.first.no}</span> ${row.first.item}
                        </td>`;
      if (row.second) {
        htmlStats += ` <td>
                              <span class="label label-success">${row.second.no}</span>  ${row.second.item}
                        </td>`;
      }
      else {
        htmlStats += ` <td>
                              
                        </td>`;
      }
      htmlStats += `</tr>`;
    });
    console.log('htmlStats:', htmlStats);
    elemTBody.insertAdjacentHTML('afterbegin', htmlStats);
    this.styleStats();
    
  }

  styleStats(){
    const elemStats = document.getElementsByClassName("label-success") as HTMLCollectionOf<HTMLElement>;
    let i = 0;
    for (i = 0; i < elemStats.length; i++) {
      elemStats[i].style.background = '#34495e';
      elemStats[i].style.color = '#FFFFFF';
    }
  }

  addStat(s: Stat) {
    console.log('starting addStat(s: Stat)');
    console.log('this.headerData.stats/Before:', this.headerData.stats);
    this.headerData.stats.push(s);
    console.log('this.headerData.stats/After:', this.headerData.stats);
    this.setStats();
  }

  removeStats() {
    console.log('starting removeStats()');
    const statRows = document.getElementsByClassName('row-stat') as HTMLCollectionOf<Element>;
    let i = 0;
    for (i = 0; i < statRows.length; i++) {
      statRows[i].parentNode.removeChild(statRows[i]);
    }
  }

}
