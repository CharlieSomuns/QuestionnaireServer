import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ajax } from '../../utils/ajax'
import { sessionstorage } from '../../utils/storage'

@Component({
    selector: 'user-questionnaire-answer-view',
    templateUrl: './questionnaire-answer-view.component.html',
    styleUrls: ['./questionnaire-answer-view.component.css']
})
export class QuestionnaireAnswerViewComponent implements OnInit {
    // 问卷接口
    api = '/api/v1/questionnaire_answer'
    // 问卷id
    questionnaire_id: any

    now = new Date()
    // 问卷对象
    questionnaire: any = {
        title: '',
    }
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
        ajax.success = data => {
            that.questionnaire = data
        }
        ajax.get(that.api, {
            questionnaire_id: that.questionnaire_id
        })
    }
}
