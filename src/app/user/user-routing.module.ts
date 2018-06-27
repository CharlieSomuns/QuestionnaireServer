import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { UserComponent } from './user.component'
import { IndexComponent } from './index/index.component'
import { QuestionnaireComponent } from './questionnaire/questionnaire.component'
import { QuestionnaireViewComponent } from './questionnaire-view/questionnaire-view.component'
import { QuestionnaireAnswerComponent } from './questionnaire-answer/questionnaire-answer.component'
import { QuestionnaireAnswerViewComponent } from './questionnaire-answer-view/questionnaire-answer-view.component'
import { SettingComponent } from './setting/setting.component';
import { PointComponent } from './point/point.component';

const userRoutes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: '',
                component: IndexComponent
            },
            {
                path: 'questionnaire',
                component: QuestionnaireComponent
            },
            {
                path: 'questionnaire-view',
                component: QuestionnaireViewComponent
            },
            {
                path: 'questionnaire-answer',
                component: QuestionnaireAnswerComponent
            },
            {
                path: 'questionnaire-answer-view',
                component: QuestionnaireAnswerViewComponent
            },
            {
                path: 'point',
                component: PointComponent
            },
            {
                path: 'setting',
                component: SettingComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule { }
