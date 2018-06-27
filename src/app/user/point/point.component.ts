import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ajax } from '../../utils/ajax'
import { sessionstorage } from '../../utils/storage'

@Component({
    selector: 'customer-point',
    templateUrl: './point.component.html',
    styleUrls: ['./point.component.css']
})
export class PointComponent implements OnInit {
    filters = [
        {
            active: true,
            class: 'default',
            name: '获取',
            direction: 1
        },
        {
            active: false,
            class: 'warning',
            name: '使用',
            direction: 0
        }
    ]
    api = '/api/v1/user_point'
    pages = 1;
    query_direction = 1;
    query_limit = 15
    query_page = 1
    point_history = []
    balance=0
    constructor(private router: Router) {

    }
    ngOnInit() {
        this.get()
    }
    query(filter) {
        for (let item of this.filters) {
            item.active = false
        }
        filter.active = true
        this.query_page = 1
        this.query_direction = filter.direction
        this.get()
    }
    change_limit() {
        this.query_page = 1
        this.get()
    }
    pre_page() {
        this.query_page -= 1
        if (this.query_page < 1) {
            this.query_page += 1
            return
        }
        this.get()
    }
    next_page() {
        this.query_page += 1
        if (this.query_page > this.pages) {
            this.query_page -= 1
            return
        }
        this.get()
    }
    // 查询流水
    get() {
        let that = this
        let ajax = new Ajax()
        let query_data = {
            limit: that.query_limit,
            direction: that.query_direction,
            page: that.query_page,
        }
        ajax.success = data => {
            that.point_history = data.objs
            that.pages = data.pages
            that.balance=data.balance
        }
        ajax.get(that.api, query_data)
    }
}
