import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { CommonModule, DatePipe } from '@angular/common';
import {CrystalLightboxModule} from '@crystalui/angular-lightbox';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PayComponent } from './pay/pay.component';
import {MatIconModule} from '@angular/material/icon';
import { FocusDirective } from './focus.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { HelpdialogComponent } from './helpdialog/helpdialog.component';
import { GalleryDialogComponent } from './gallery-dialog/gallery-dialog.component';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    CommonModule,
    MatDialogModule,
    CrystalLightboxModule,
    MatIconModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    PayComponent,
    FocusDirective,
    HelpdialogComponent,
    GalleryDialogComponent,
    CounterComponent
  ],
  entryComponents: [
    HelpdialogComponent,
    GalleryDialogComponent
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
