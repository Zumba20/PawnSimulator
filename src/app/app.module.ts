import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PawnPageComponent } from './pawn-page/pawn-page.component';
import { PawnService } from './pawn-page/pawn.service';
import { HelperService } from './pawn-page/helper';

@NgModule({
  declarations: [
    AppComponent,
    PawnPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [PawnService, HelperService],
  bootstrap: [PawnPageComponent]
})
export class AppModule { }
