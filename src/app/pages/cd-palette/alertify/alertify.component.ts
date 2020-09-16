import { Component, OnInit, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'ngx-alertify',
  templateUrl: './alertify.component.html',
  styleUrls: ['./alertify.component.scss']
})
export class AlertifyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  success() {
    console.log('starting success()');
    // $(".notify").toggleClass("active");
    // $("#notifyType").toggleClass("success");
    const elemNotify = document.getElementsByClassName('notify');
    elemNotify[0].classList.toggle("active");
    const elemNotifyType = document.getElementById('notifyType');
    elemNotifyType.classList.toggle("success");
    // elemNotifyType.classList.toggle("succeed");
    $(".notify").css({ backgroundColor: 'rgba(26, 252, 5, 0.1)' });

    setTimeout(function () {
      $(".notify").removeClass("active");
      $("#notifyType").removeClass("success");
      $("#notifyType").removeClass("succeed");
    }, 2000);
  }

  failure() {
    $(".notify").addClass("active");
    $("#notifyType").addClass("failure");
    $(".notify").css({ backgroundColor: 'rgba(252, 5, 5, 0.3)' });

    setTimeout(function () {
      $(".notify").removeClass("active");
      $("#notifyType").removeClass("failure");
    }, 2000);
  }

}
