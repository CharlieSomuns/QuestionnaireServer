import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Ajax } from '../../utils/ajax'
import { sessionstorage } from '../../utils/storage'

@Component({
    selector: 'admin-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent {
    filters = [
        // {
        //     active: true,
        //     class: 'default',
        //     name: '草稿',
        //     state: 0
        // },
        {
            active: true,
            class: 'warning',
            name: '待审核',
            state: 1
        },
        // {
        //     active: false,
        //     class: 'danger',
        //     name: '审核失败',
        //     state: 2
        // },
        {
            active: false,
            class: 'success',
            name: '审核通过',
            state: 3
        },
        {
            active: false,
            class: 'info',
            name: '已发布',
            state: 4
        },
    ]
    api = '/api/v1/admin_questionnaire'
    pages = 10;
    query_state = 1;
    query_limit = 15
    query_page = 1
    questionnaires = []
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
        this.query_state = filter.state
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
    get() {
        let that = this
        let ajax = new Ajax()
        let query_data = {
            limit: that.query_limit,
            state: that.query_state,
            page: that.query_page,
        }
        ajax.success = data => {
            console.log(data)
            that.questionnaires = data.objs
            that.pages = data.pages
        }
        ajax.get(that.api, query_data)
    }


    view(index) {
        sessionstorage.set('questionnaire_id', this.questionnaires[index].id)
        this.router.navigateByUrl('/admin/questionnaire-view')
    }
}
