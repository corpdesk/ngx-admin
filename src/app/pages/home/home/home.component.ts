import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// this.router.url === '/login'
@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.router.url);
    if(this.router.url === '/pages/home'){
      this.router.navigateByUrl('/pages/home/news-feed');
    }
  }

}
