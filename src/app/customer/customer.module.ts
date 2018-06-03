import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


import { CustomerRoutingModule } from './customer-routing.module'
import { CustomerComponent } from './customer.component';
import { IndexComponent } from './index/index.component';

@NgModule({
    declarations: [
        CustomerComponent,
        IndexComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        CustomerRoutingModule,
    ],
    providers: [],
    bootstrap: [CustomerComponent]
})
export class CustomerModule { }
