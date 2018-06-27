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
    api = '/api/v1/user_questionnaire'
    pages = 1;
    query_limit = 15
    query_page = 1
    questionnaires = []
    constructor(private router: Router) {
    }

    ngOnInit() {
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
        this.router.navigateByUrl('/user/questionnaire-view')
    }
}
