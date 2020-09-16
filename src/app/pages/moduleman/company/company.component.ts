import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NotifierService, NotifierOptions } from "angular-notifier";

@Component({
  selector: 'ngx-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})

export class CompanyComponent implements OnInit, AfterViewInit {
  @ViewChild("customNotification", { static: true }) customNotificationTmpl;

  private readonly notifier: NotifierService;

  notifierDefaultOptions: NotifierOptions = {
    position: {
      horizontal: {
        position: "right",
        distance: 12
      },
      vertical: {
        position: "top",
        distance: 12,
        gap: 10
      }
    },
    theme: "material",
    behaviour: {
      autoHide: 5000,
      onClick: false,
      onMouseover: "pauseAutoHide",
      showDismissButton: true,
      stacking: 4
    },
    animations: {
      enabled: true,
      show: {
        preset: "slide",
        speed: 300,
        easing: "ease"
      },
      hide: {
        preset: "fade",
        speed: 300,
        easing: "ease",
        offset: 50
      },
      shift: {
        speed: 300,
        easing: "ease"
      },
      overlap: 150
    }
  };

  constructor(private notifierService: NotifierService) {
    // this.notifier = notifierService;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }

  isSuccess() {
    // this.vcAlertify.success();
    // this.notifier.notify("success", "You are awesome! I mean it!");
    this.showNotification();
  }

  showNotification() {
    this.notifierService.show({
      message: "Hi there!",
      type: "info",
      template: this.customNotificationTmpl
    });
  }

}
