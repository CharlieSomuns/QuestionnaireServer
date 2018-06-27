import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Ajax } from '../../utils/ajax'
import { sessionstorage } from '../../utils/storage'

@Component({
    selector: 'customer-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
    tabs = [
        {
            name: "我的钱包",
            active: true,
        },
        {
            name: "流水",
            active: false
        }
    ]
    amount = ""
    payments = [
        {
            name: "alipay",
            src: "/static/images/alipay.png"
        },
        {
            name: "wechatpay",
            src: "/static/images/wechatpay.png"
        }
    ]
    wallet = {
        balance: ""
    }
    qrcode = ""
    api = '/api/v1/wallet'
    constructor(private router: Router,public sanitizer: DomSanitizer) {
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
            that.wallet = data
        }
        ajax.get(that.api, {})
    }
    get_qrcode(payment) {
        let that = this
        let ajax = new Ajax()
        let data = {
            amount: this.amount,
            payment: payment
        }
        ajax.success = (data) => {
            that.qrcode = data.qrcode
        }
        ajax.put(that.api, data)
    }

    put() {
        let that = this
        let ajax = new Ajax()
        let query_data = {
        }
        ajax.success = (data) => {
            alert("更新成功")
        }
        ajax.put(that.api, that)
    }
    get_wallet_flow() {

    }
}
