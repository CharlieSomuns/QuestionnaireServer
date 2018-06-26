import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminRoutingModule } from './admin-routing.module'
import { AdminComponent } from './admin.component';
import { IndexComponent } from './index/index.component';
import { QuestionnaireViewComponent } from './questionnaire-form/questionnaire-form.component';

@NgModule({
    declarations: [
        AdminComponent,
        IndexComponent,
        QuestionnaireViewComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AdminRoutingModule
    ],
    providers: [],
    bootstrap: [AdminComponent]
})
export class AdminModule { }
