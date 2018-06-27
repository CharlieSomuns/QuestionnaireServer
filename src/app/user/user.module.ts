import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { UserRoutingModule } from './user-routing.module'
import { UserComponent } from './user.component';
import { IndexComponent } from './index/index.component'
import { QuestionnaireComponent } from './questionnaire/questionnaire.component'
import { QuestionnaireViewComponent } from './questionnaire-view/questionnaire-view.component'
import { QuestionnaireAnswerComponent } from './questionnaire-answer/questionnaire-answer.component'
import { QuestionnaireAnswerViewComponent } from './questionnaire-answer-view/questionnaire-answer-view.component'
import { SettingComponent } from './setting/setting.component';
import { PointComponent } from './point/point.component';

@NgModule({
    declarations: [
        UserComponent,
        IndexComponent,
        QuestionnaireComponent,
        QuestionnaireViewComponent,
        QuestionnaireAnswerComponent,
        QuestionnaireAnswerViewComponent,
        SettingComponent,
        PointComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        UserRoutingModule
    ],
    providers: [],
    bootstrap: [UserComponent]
})
export class UserModule { }
