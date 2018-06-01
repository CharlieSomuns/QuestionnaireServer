import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CustomerRoutingModule } from './customer-routing.module'
import { CustomerComponent } from './customer.component';

@NgModule({
    declarations: [
        CustomerComponent
    ],
    imports: [
        CustomerRoutingModule
    ],
    providers: [],
    bootstrap: [CustomerComponent]
})
export class CustomerModule { }
