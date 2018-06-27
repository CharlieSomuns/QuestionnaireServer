import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ajax } from '../../utils/ajax'
import { sessionstorage } from '../../utils/storage'

@Component({
    selector: 'user-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
    filters = [
        {
            active: true,
            class: 'default',
            name: '参与中',
            is_done: false
        },
        {
            active: false,
            class: 'warning',
            name: '已完成',
            is_done: true
        }
    ]
    api = '/api/v1/questionnaire_join'
    pages = 10;
    query_isdone = 0;
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
        this.query_isdone = filter.is_done
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
            is_done: that.query_isdone,
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
    // 编辑问卷
    edit(index) {
        sessionstorage.set('questionnaire_id', this.questionnaires[index].questionnaire.id)
        this.router.navigateByUrl('/user/questionnaire-answer')
    }
    // 查看问卷
    view(index){
        sessionstorage.set('questionnaire_id', this.questionnaires[index].questionnaire.id)
        this.router.navigateByUrl('/user/questionnaire-answer-view')
    }
}
