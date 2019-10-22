import { Injectable } from '@angular/core';
import  *  as makerjs  from 'makerjs';
import * as opentype from 'opentype.js';
(window as any).makerjs = makerjs;
@Injectable({
  providedIn: 'root'
})
export class MakerService {
  line = { 
    type: 'line', 
    origin: [0, 0], 
    end: [50, 50] 
   };
   font;
   
   metaParameters = [
    { title: 'font', type: 'font', value: '*' },
    { title: 'text', type: 'text', value: 'a' },
    { title: 'font size', type: 'range', min: 10, max: 200, value: 72 },
    { title: 'combine', type: 'bool', value: false },
    { title: 'center character origin', type: 'bool', value: false }
  ];
  constructor() { }
  
   getm() {
    const svg = makerjs.exporter.toSVG(this.line);
     return svg;
   }

  make(font, text, font_size, combine, center_character_origin) {
    const model = new makerjs.models.Text(font, text, font_size, combine, center_character_origin);
    return model;
  }
}
 