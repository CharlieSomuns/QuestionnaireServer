import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ajax } from '../../utils/ajax'
import { sessionstorage } from '../../utils/storage'

@Component({
    selector: 'customer-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
    user = {
        category: "",
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        birthday: "",
        qq: "",
        wechat: "",
        job: "",
        salary: "",
    }
    pwd = {
        password: "",
        ensure_password: ""
    }
    tabs = [
        {
            name: "信息",
            active: true,
        },
        {
            name: "密码",
            active: false
        }
    ]

    api = '/api/v1/user'
    pwd_api = "/api/v1/password"
    constructor(private router: Router) {

    }

    ngOnInit() {
        this.get()
    }
    // 查询问卷
    active_tab(tab) {
        for (let item of this.tabs) {
            item.active = false
        }
        tab.active = true
    }
    get() {
        let that = this
        let ajax = new Ajax()
        let query_data = {
        }
        ajax.success = (data) => {
            that.user = data
        }
        ajax.get(that.api, {})
    }

    post() {
        let that = this
        let ajax = new Ajax()
        let query_data = {
        }
        ajax.success = (data) => {
            alert("更新成功")
        }
        ajax.post(that.api, that.user)
    }
    udpate_password() {
        let that = this
        let ajax = new Ajax()
        let query_data = {
        }
        ajax.success = (data) => {
            alert("更新成功")
        }
        ajax.post(that.pwd_api, that.pwd)
    }
}
