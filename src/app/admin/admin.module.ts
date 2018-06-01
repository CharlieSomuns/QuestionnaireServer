import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from './admin-routing.module'
import { AdminComponent } from './admin.component';
import { IndexComponent } from './index/index.component';

@NgModule({
    declarations: [
        AdminComponent,
        IndexComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule
    ],
    providers: [],
    bootstrap: [AdminComponent]
})
export class AdminModule { }
