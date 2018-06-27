import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ajax } from '../../utils/ajax'
import { sessionstorage } from '../../utils/storage'

@Component({
    selector: 'user-questionnaire-answer',
    templateUrl: './questionnaire-answer.component.html',
    styleUrls: ['./questionnaire-answer.component.css']
})
export class QuestionnaireAnswerComponent implements OnInit {
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
    done() {
        let that = this
        let ajax = new Ajax()
        ajax.success = data => {
            alert('提交成功')
            window.history.back()
        }
        ajax.post('/api/v1/questionnaire_join', {
            questionnaire_id: that.questionnaire_id
        })
    }
    select(question, item) {
        if (question.category === 'radio') {
            for (let item of question.items) {
                item.active = false
            }
            let that = this
            let ajax = new Ajax()
            ajax.success = data => {
                item.active = true
            }
            ajax.put(that.api, {
                item_id: item.id
            })
        }
        else {
            let that = this
            let ajax = new Ajax()
            ajax.success = data => {
                item.active = !item.active
            }
            if (!item.active) {
                ajax.put(that.api, {
                    item_id: item.id
                })
            } else {
                ajax.delete(that.api, {
                    item_id: item.id
                })
            }
        }
    }
}
