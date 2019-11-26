import { Component, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';

import { PayComponent } from './pay/pay.component';
import { HelpdialogComponent } from './helpdialog/helpdialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { GalleryDialogComponent } from './gallery-dialog/gallery-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  constructor (private dialog: MatDialog) {}
  phone;
  innerwidth;
  disabled = false;
  colors = [
    { value: 'black', viewValue: 'שחור - OUTDOOR 9005 מגורען מתכתי', id: '9005' },
    { value: 'grey', viewValue: 'אפור - OUTDOOR 1200 מגורען מתכתי', id: '1200' },
    { value: 'white', viewValue: 'לבן - OUTDOOR 9016 מגורען מתכתי', id: '9016' },
    { value: 'offwhite', viewValue: 'אוף-ווייט - OUTDOOR IRON 2040 מגורען מתכתי', id: '2040' }
  ];
  dir =
    [
      { value: 'right', viewValue: 'ימין' },
      { value: 'left', viewValue: 'שמאל' },
    ];
  @ViewChild('top', { static: true }) top: ElementRef;
  @ViewChild('dtext', { static: true }) dtext: ElementRef;
  @ViewChild('dphone', { static: true }) dphone: ElementRef;
  @ViewChild('demail', { static: true }) demail: ElementRef;

  @ViewChild('dlang', { static: true }) dlang: ElementRef;
  @ViewChild('dcolor', { static: true }) dcolor: ElementRef;

  @ViewChild(PayComponent, { static: true }) pay: PayComponent;
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
  reload() {
    window.location.reload();
  }
  openDialog(gallery?) {
    if (!gallery) {
    let dialogRef = this.dialog.open(HelpdialogComponent, {
      height: '90%',
      width: '90%',
    });
  } else {
    let dialogRef = this.dialog.open(GalleryDialogComponent, {
      height: '90%',
      width: '90%',
    });
  }
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
    if (!this.dtext.nativeElement.value) {
      alert('אנא הכנס מלל.');
      return;
    }
    if (!this.dphone.nativeElement.value && !this.demail.nativeElement.value) {
      alert('אנא מלא שדה אחד ליצירת קשר');
      return;
    }
    this.appendDiv()
    this.disabled = true;
    this.pay.readyToPay();
  }
}