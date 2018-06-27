import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component'

const adminRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'common',
        loadChildren: './common/common.module#CommonModule'
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
    },
    {
        path: 'customer',
        loadChildren: './customer/customer.module#CustomerModule'
    },
    {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
