import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CustomerComponent } from './customer.component'
import { IndexComponent } from './index/index.component'

const customerRoutes: Routes = [
    {
        path: '',
        component: CustomerComponent,
        children:[
            {
                path:'',
                component:IndexComponent
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
