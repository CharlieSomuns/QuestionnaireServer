import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module'
import { AdminComponent } from './admin.component';

@NgModule({
    declarations: [
        AdminComponent
    ],
    imports: [
        AdminRoutingModule
    ],
    providers: [],
    bootstrap: [AdminComponent]
})
export class AdminModule { }
