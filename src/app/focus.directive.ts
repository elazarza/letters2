import { Directive, HostListener, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnInit {
  phone;
  innerwidth;
  constructor(private El: ElementRef) { }
  @HostListener('window:resize', ['$event']) onResize(e) {
    this.innerwidth = window.innerWidth;
    if (this.innerwidth <= 500) {
      this.phone = true;
    } else {
      this.phone = false;
    }
  }
  ngOnInit() {
    this.innerwidth = window.innerWidth;
    if (this.innerwidth <= 500) {
      this.phone = true;
    }
  }
  @HostListener('focus', ['$event']) focusEl(e) {
    if (this.phone) {
      setTimeout(() => {
        this.El.nativeElement.scrollIntoView(true);
      }, 500);
    }
  }
}
