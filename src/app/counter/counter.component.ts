import { Component, OnInit } from '@angular/core';
import { ConService } from '../con2.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  constructor(private conService: ConService) { }

  views;
  ngOnInit() {
    this.conService.getCount().subscribe(res => this.views = res);
  }

}
