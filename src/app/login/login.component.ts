import { Component } from '@angular/core';

import { Router } from '@angular/router'

import { Ajax } from '../utils/ajax'
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    user = {
        username: "",
        password: ""
    }
    regist = {
        username: "",
        password: "",
        ensure_password: "",
        regist_code: "",
        category:'customer'
    }
    regist_code = "点击"
    show_regist = false;
    constructor(private router: Router) {
        this.get()
    }
    login_user() {
        let that = this
        let ajax = new Ajax()
        ajax.params_error = (data) => {
            alert('用户名或密码错误')
        }
        ajax.success = (data) => {
            that.get()
        }
        ajax.put('/api/v1/session', that.user)
    }
    regist_user() {
        let that = this
        let ajax = new Ajax()
        ajax.success = (data) => {
            that.redirect('customer')
        }
        ajax.put('/api/v1/user', that.regist)
    }
    redirect(category) {
        if (category == 'customer') {
            this.router.navigateByUrl('/customer')
        }
        else if (category == 'userinfo') {
            this.router.navigateByUrl('/user')
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
    get_regist_code() {
        console.log("get")
        let that = this;
        let ajax = new Ajax()
        ajax.success = (data) => {
            that.regist_code = data.regist_code
        }
        console.log('api')
        ajax.get('/api/v1/regist_code', {})
    }
}
