import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonRoutingModule } from './common-routing.module'
import { CommonComponent } from './common.component';

@NgModule({
    declarations: [
        CommonComponent
    ],
    imports: [
        CommonRoutingModule
    ],
    providers: [],
    bootstrap: [CommonComponent]
})
export class CommonModule { }
