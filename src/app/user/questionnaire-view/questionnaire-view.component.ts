import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ajax } from '../../utils/ajax'
import { sessionstorage } from '../../utils/storage'

@Component({
    selector: 'user-questionnaire-view',
    templateUrl: './questionnaire-view.component.html',
    styleUrls: ['./questionnaire-view.component.css']
})
export class QuestionnaireViewComponent implements OnInit {
    // 问卷接口
    api = '/api/v1/user_questionnaire'
    // 问卷id
    questionnaire_id: any

    now = new Date()
    // 问卷对象
    questionnaire: any = {
        title: '',
        deadline: this.now.getFullYear() + '-' + (this.now.getMonth() + 1) + '-' + this.now.getDate(),
        quantity: 100,
        questions: [],
    }
    new_comment = ""
    constructor(private router: Router) {
        this.questionnaire_id = sessionstorage.get('questionnaire_id')
    }

    ngOnInit() {
        this.get_questionnaire()
    }
    // 获取问卷信息
    get_questionnaire() {
        let that = this
        let ajax = new Ajax()
        let query_data = {
            limit: 1,
            start_id: parseInt(this.questionnaire_id) - 1,
            with_detail: true
        }
        ajax.success = data => {
            that.questionnaire = data.objs[0]
        }
        ajax.get(that.api, query_data)
    }
    join() {
        let that = this
        let ajax = new Ajax()
        ajax.success = data => {
            alert('参与成功')
            window.history.back()
        }
        ajax.put('/api/v1/questionnaire_join', {
            questionnaire_id: that.questionnaire_id
        })
    }
}
