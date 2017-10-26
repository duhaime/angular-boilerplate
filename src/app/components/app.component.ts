import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-target',
  template: `
    <div class='main-routes'>
      <a routerLink='/home'>Home</a>
      <a routerLink='/about'>About</a>
    </div>
    <router-outlet></router-outlet>
  `
})

export class AppComponent implements OnInit {
  constructor(private dataService: DataService) { }

  data: any = [];

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dataService.getData().then(data => this.data = data)
  }
}