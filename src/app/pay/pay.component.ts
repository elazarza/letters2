import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MakerService } from '../maker.service';
import * as opentype from 'opentype.js';
import *  as makerjs from 'makerjs';
import { ConService } from '../con2.service';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

declare var paypal;
// export declare let makerjs = require('makerjs');
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  @ViewChild('paypal', { static: true }) paypalElementL: ElementRef;
  // @ViewChild('test', { static: true }) test: ElementRef;
  signDets: { font: opentype.Font, text: string, font_size: number, combine: boolean, center_character_origin: boolean, phone: string, email: string } = {
    font: null,
    text: null,
    font_size: null,
    combine: false,
    center_character_origin: false,
    phone: null,
    email: null

  };
  colors = {
    black: 'שחור - OUTDOOR 9005 מגורען מתכתי',
    white: 'לבן - OUTDOOR 9016 מגורען מתכתי',
    grey: 'אפור - OUTDOOR 1200 מגורען מתכתי',
    offwhite: 'אוף-ווייט - OUTDOOR IRON 2040 מגורען מתכתי'
  }
  fonts = {
    hebrew: './assets/arial.ttf',
    arabic: './assets/DejaVuSans.ttf'
  };
  dir = {
    right: 'ימין',
    left: 'שמאל'
  };
  selectedFont;
  file;
  text = '';
  font;
  paidFor = false;
  ready = false;
  shipping = {address: null, zipcode: null, name: null, address2: null, city: null, oid: null, city2: null};
  constructor(
    private makerService: MakerService,
    private conService: ConService
  ) { }
  product = {
    price: 399,
    description: 'אותיות מתכת לבית',
    color: 'black',
    lang: 'heb',
    dir: 'right'
  };
  download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:application/dxf;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  ngOnInit() {
this.makefile()

    // const b = new Blob([file], {type: 'dxf'})
    // console.log(b);
    // console.log(enfile);

    // this.download('test.dxf', file);

  }
   reverseString(str) {
    return str.split('').reverse().join('');
}
  convertString(string: string) {
    const he = /[\u0590-\u05FF]/;
    const arr = string.split(' ');
    const reString = [];
    for (let i = 0; i < arr.length; i++) {
      if (he.test(arr[i])) {
        reString.push(this.reverseString(arr[i]));
      } else {
        reString.push(arr[i])
      }
    }
    console.log(reString);

    return reString.reverse().join(' ');
  }
  saveData() {

  }
  makefile() {

    opentype.load('./assets/DejaVuSans.ttf', (err, font) => {
      if (err) {
        alert('Can not load font');
        return;
      }
      this.font = font;
      // const sign: any = this.makerService.make(this.signDets.font, this.signDets.text, this.signDets.font_size, this.signDets.combine, this.signDets.center_character_origin); // this.font, 'שלום', 72, false, false);
      const sign: any = this.makerService.make(this.font, this.convertString(this.text),72,false,false); // this.font, 'שלום', 72, false, false);
      sign.layer = 'colorname2';
      // this.test.nativeElement.innerHTML = makerjs.exporter.toSVG(sign, {
      //   layerOptions: {
      //     colorname2: {
      //       fill: this.product.color,
      //       stroke: this.product.color
      //     }
      //   }
      // });
      sign.layer = 'colorname';
      const file = makerjs.exporter.toDXF(sign, {
        layerOptions: {
          colorname: {
            color: makerjs.exporter.colors[this.product.color],
            fontSize: 72
          }
        }
      });
      this.file = btoa(file);
    });
  }
 
  readyToPay() {
    this.ready = true;
    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.product.description + ' ' + this.colors[this.product.color],
              amount: {
                currency_code: 'ILS',
                value: this.product.price
              }
            }
          ]
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log(data,actions,order);
        
        // show confirmation and save order
        this.shipping.address = order.purchase_units[0].shipping.address.address_line_1;
        this.shipping.address2 = order.purchase_units[0].shipping.address.address_line_2 || '';
        this.shipping.zipcode = order.purchase_units[0].shipping.address.postal_code;
        this.shipping.name = order.purchase_units[0].shipping.name.full_name;
        this.shipping.city = order.purchase_units[0].shipping.address.admin_area_2;
        this.shipping.city2 = order.purchase_units[0].shipping.address.admin_area_1 || '';
        this.shipping.oid = order.id;
        this.conService.insert(this.shipping.name,this.shipping.address, this.shipping.address2, this.colors[this.product.color], this.dir[this.product.dir], this.text, this.shipping.zipcode, this.shipping.city, this.shipping.city2, this.signDets.phone, this.signDets.email, this.shipping.oid, this.file).subscribe(res => console.log('>>>>>>>>', res));

        console.log(order);
        this.paidFor = true;
      },
      onError: err => {
        console.log(err);

      }
    }).render(this.paypalElementL.nativeElement);
  }
}
