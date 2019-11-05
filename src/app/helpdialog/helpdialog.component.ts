import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-helpdialog',
  templateUrl: './helpdialog.component.html',
  styleUrls: ['./helpdialog.component.scss']
})
export class HelpdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HelpdialogComponent>) { }

  ngOnInit() {
  }

}

