import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CustomerComponent } from './customer.component'
import { IndexComponent } from './index/index.component'
import { QuestionnaireFormComponent } from './questionnaire-form/questionnaire-form.component'
import { QuestionnaireViewComponent } from './questionnaire-view/questionnaire-view.component'

const customerRoutes: Routes = [
    {
        path: '',
        component: CustomerComponent,
        children:[
            {
                path:'',
                component:IndexComponent
            },
            {
                path:'questionnaire-form',
                component:QuestionnaireFormComponent
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
        RouterModule.forChild(customerRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CustomerRoutingModule { }
