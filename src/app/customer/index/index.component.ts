import { Component } from '@angular/core';
import { Ajax } from '../../utils/ajax'

@Component({
    selector: 'customer-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent {
    filters = [
        {
            active: true,
            class: 'default',
            name: '草稿',
            state: 0
        },
        {
            active: false,
            class: 'warning',
            name: '待审核',
            state: 1
        },
        {
            active: false,
            class: 'danger',
            name: '审核失败',
            state: 2
        },
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
    pages = 10;
    query_state = 0;
    query_limit = 15
    query_page = 1

    query(filter) {
        for (let item of this.filters) {
            item.active = false
        }
        filter.active = true
        this.query_page = 1
        this.query_state = filter.state
        console.log(this.query_page)
        this.get_questionnaire()
    }
    change_limit() {
        this.query_page = 1
        this.get_questionnaire()
    }
    pre_page() {
        if (this.query_page == 1) {
            return
        }
        this.query_page -= 1
        this.get_questionnaire()
    }
    next_page() {
        if (this.query_page == this.pages) {
            return
        }
        this.query_page += 1
        this.get_questionnaire()
    }
    get_questionnaire() {
        let that = this
        let ajax = new Ajax()
        let query_data = {
            limit: that.query_limit,
            state: that.query_state,
            page: that.query_page,
        }
        console.log(query_data)
        ajax.success = data => {
        }
        ajax.get('/api/v1/questionnaire', query_data)
    }
}
