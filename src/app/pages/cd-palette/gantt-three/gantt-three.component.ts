import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';



// amCharts imports
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


@Component({
  selector: 'ngx-gantt-three',
  templateUrl: './gantt-three.component.html',
  styleUrls: ['./gantt-three.component.scss']
})
export class GanttThreeComponent implements OnInit {

  private chart: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }

  ngOnInit(): void {

  }
  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.paddingRight = 30;
      chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";

      let colorSet = new am4core.ColorSet();
      colorSet.saturation = 0.4;

      chart.data = [
        {
          name: "John",
          fromDate: "2018-01-01 08:00",
          toDate: "2018-01-01 10:00",
          color: colorSet.getIndex(0).brighten(0)
        },
        {
          name: "John",
          fromDate: "2018-01-01 12:00",
          toDate: "2018-01-01 15:00",
          color: colorSet.getIndex(0).brighten(0.4)
        },
        {
          name: "John",
          fromDate: "2018-01-01 15:30",
          toDate: "2018-01-01 21:30",
          color: colorSet.getIndex(0).brighten(0.8)
        },

        {
          name: "Jane",
          fromDate: "2018-01-01 09:00",
          toDate: "2018-01-01 12:00",
          color: colorSet.getIndex(2).brighten(0)
        },
        {
          name: "Jane",
          fromDate: "2018-01-01 13:00",
          toDate: "2018-01-01 17:00",
          color: colorSet.getIndex(2).brighten(0.4)
        },

        {
          name: "Peter",
          fromDate: "2018-01-01 11:00",
          toDate: "2018-01-01 16:00",
          color: colorSet.getIndex(4).brighten(0)
        },
        {
          name: "Peter",
          fromDate: "2018-01-01 16:00",
          toDate: "2018-01-01 19:00",
          color: colorSet.getIndex(4).brighten(0.4)
        },

        {
          name: "Melania",
          fromDate: "2018-01-01 16:00",
          toDate: "2018-01-01 20:00",
          color: colorSet.getIndex(6).brighten(0)
        },
        {
          name: "Melania",
          fromDate: "2018-01-01 20:30",
          toDate: "2018-01-01 24:00",
          color: colorSet.getIndex(6).brighten(0.4)
        },

        {
          name: "Donald",
          fromDate: "2018-01-01 13:00",
          toDate: "2018-01-01 24:00",
          color: colorSet.getIndex(8).brighten(0)
        }
      ];



      let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "name";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.labels.template.fill = am4core.color("#c0c2c4");

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm";
      dateAxis.renderer.minGridDistance = 70;
      dateAxis.baseInterval = { count: 30, timeUnit: "minute" };
      dateAxis.max = new Date(2018, 0, 1, 24, 0, 0, 0).getTime();
      dateAxis.strictMinMax = true;
      dateAxis.renderer.tooltipLocation = 0;

      let series1 = chart.series.push(new am4charts.ColumnSeries());
      series1.columns.template.width = am4core.percent(80);
      series1.columns.template.tooltipText = "{name}: {openDateX} - {dateX}";

      series1.dataFields.openDateX = "fromDate";
      series1.dataFields.dateX = "toDate";
      series1.dataFields.categoryY = "name";
      series1.columns.template.propertyFields.fill = "color"; // get color from data
      series1.columns.template.propertyFields.stroke = "color";
      series1.columns.template.strokeOpacity = 1;

      chart.scrollbarX = new am4core.Scrollbar();
    });

    const elemLables = document.getElementsByTagName('tspan') as HTMLCollectionOf<SVGTSpanElement>;
    for (let i = 0; i < elemLables.length; i++) {
      let element = elemLables[i];
      // element.style.background = '#2B2B2B';
      element.style.color = '#fff';
    }
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
