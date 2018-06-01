import { Component } from '@angular/core';

import { Router } from '@angular/router'

import { Ajax } from '../utils/ajax'
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(private router: Router) {
        this.get()
    }
    login() {
        let that = this
        let ajax = new Ajax()
        ajax.params_error = (data) => {
            alert('用户名或密码错误')
        }
        ajax.success = (data) => {
            that.get()
        }
        ajax.put('/api/v1/session', {
            username: 'customer1',
            password: '1234567'
        })
    }
    login_admin() {
        let that = this
        let ajax = new Ajax()
        ajax.params_error = (data) => {
            alert('用户名或密码错误')
        }
        ajax.success = (data) => {
            that.get()
        }
        ajax.put('/api/v1/session', {
            username: 'admin',
            password: '1234admin'
        })
    }
    redirect(category) {
        if (category == 'customer') {
            this.router.navigateByUrl('/customer')
        }
        else if (category == 'userinfo') {
            return false
        }
        else {
            this.router.navigateByUrl('/admin')
        }
    }
    get() {
        let that = this
        let ajax = new Ajax()
        ajax.success = (data) => {
            that.redirect(data.category)
        }
        ajax.get('/api/v1/user', {})
    }
}
