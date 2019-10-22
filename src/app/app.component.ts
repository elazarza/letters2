import { Component, HostListener, ViewChild, ElementRef, OnInit  } from '@angular/core';
import { PayComponent } from './pay/pay.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  phone;
  innerwidth;
  disabled = false;
  colors = [
    {value: 'black', viewValue: 'שחור'},
    {value: 'grey', viewValue: 'אפור'},
    {value: 'blue', viewValue: 'כחול'}
  ];
  @ViewChild('top', {static: true}) top: ElementRef;
  @ViewChild(PayComponent, {static: true}) pay: PayComponent;
  @HostListener('window:resize', ['$event']) onResize(e) {
    this.innerwidth = window.innerWidth;
    if (this.innerwidth <= 500) {
      this.phone = true;
    } else {
      this.phone = false;
    }
  }
  @HostListener('window:scroll', ['$event']) scroll(e) {

    // this.top.nativeElement.scrollIntoView( { behavior: 'smooth', block: 'start' });
  }
  appendDiv() {
    const div = document.querySelector('.overlay-div') as HTMLElement;
    div.style.display = 'block';
  }
  ngOnInit() {
    this.innerwidth = window.innerWidth;
    if (this.innerwidth <= 500) {
      this.phone = true;
    }
  }
payReady() {
 this.pay.readyToPay();
  
}
}