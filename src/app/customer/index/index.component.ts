import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ajax } from '../../utils/ajax'
import { sessionstorage } from '../../utils/storage'

@Component({
    selector: 'customer-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
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
    api = '/api/v1/customer_questionnaire'
    pages = 10;
    query_state = 0;
    query_limit = 15
    query_page = 1
    questionnaires = []
    now = new Date()
    show_new_form = false
    new_questionnaire = {
        title: '',
        deadline: this.now.getFullYear() + '-' + (this.now.getMonth() + 1) + '-' + this.now.getDate(),
        quantity: 100
    }
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
    // 查询问卷
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
    // 删除问卷
    delete(index) {
        let that = this
        let ensure = window.confirm('确认删除吗?')
        if (ensure) {
            let ajax = new Ajax()
            ajax.success = data => {
                alert('删除成功!')
                that.questionnaires.splice(index, 1)
            }
            ajax.delete(that.api, {
                ids: [that.questionnaires[index].id]
            })
        }
    }
    // 新增问卷
    put() {
        let that = this
        let ajax = new Ajax()
        ajax.success = data => {
            that.get()
            that.show_new_form = false
        }
        ajax.put(that.api, that.new_questionnaire)
    }
    // 编辑问卷
    edit(index) {
        sessionstorage.set('questionnaire_id', this.questionnaires[index].id)
        this.router.navigateByUrl('/customer/questionnaire-form')
    }
    // 发布问卷
    publish(index) {
        let that = this
        let ajax = new Ajax()
        ajax.success = data => {
            alert('发布成功!')
            that.questionnaires.splice(index, 1)
        }
        ajax.put('/api/v1/questionnaire_state', {
            questionnaire_id: that.questionnaires[index].id
        })
    }
    // 查看问卷
    view(index){
        sessionstorage.set('questionnaire_id', this.questionnaires[index].id)
        this.router.navigateByUrl('/customer/questionnaire-view')
    }
}
