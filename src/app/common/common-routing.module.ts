import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CommonComponent } from './common.component'
const adminRoutes: Routes = [
    {
        path: '',
        component: CommonComponent
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
export class CommonRoutingModule { }
