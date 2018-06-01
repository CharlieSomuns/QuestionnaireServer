import { Component } from '@angular/core';
import { Ajax } from '../../utils/ajax'

@Component({
    selector: 'admin-index',
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
    get_questionnaire(filter) {
        for (let item of this.filters) {
            item.active = false
        }
        filter.active = true
    }
}
