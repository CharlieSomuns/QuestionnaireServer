import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AdminComponent } from './admin.component'
import { IndexComponent } from './index/index.component'
import { QuestionnaireViewComponent } from './questionnaire-form/questionnaire-form.component'
const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: IndexComponent
            },
            {
                path:'questionnaire-view',
                component:QuestionnaireViewComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }
