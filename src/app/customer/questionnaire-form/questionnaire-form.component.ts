import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ajax } from '../../utils/ajax'
import { sessionstorage } from '../../utils/storage'

@Component({
    selector: 'customer-questionnaire-form',
    templateUrl: './questionnaire-form.component.html',
    styleUrls: ['./questionnaire-form.component.css']
})
export class QuestionnaireFormComponent implements OnInit {
    // 问卷接口
    api = '/api/v1/customer_questionnaire'
    // 问题接口
    quetion_api = '/api/v1/customer_question'
    // 问题题号接口
    quetion_index_api = '/api/v1/question_index'

    // 问卷id
    questionnaire_id: any
    // 问题类型
    categorys = [
        {
            name: '单选题',
            category: 'radio'
        },
        {
            name: '多选选题',
            category: 'select'
        },
    ]
    now = new Date()
    // 问卷对象
    questionnaire: any = {
        title: '',
        deadline: this.now.getFullYear() + '-' + (this.now.getMonth() + 1) + '-' + this.now.getDate(),
        quantity: 100,
        questions: []
    }
    constructor(private router: Router) {
        this.questionnaire_id = sessionstorage.get('questionnaire_id')
    }

    ngOnInit() {
        this.get_questionnaire()
    }
    up_question(index) {
        if (index <= 0) return;
        let current = this.questionnaire.questions[index]
        let pre = this.questionnaire.questions[index - 1]
        this.questionnaire.questions[index] = pre
        this.questionnaire.questions[index - 1] = current
    }
    down_question(index) {
        if (index >= this.questionnaire.questions.length - 1) return;
        let current = this.questionnaire.questions[index]
        let next = this.questionnaire.questions[index + 1]
        this.questionnaire.questions[index] = next
        this.questionnaire.questions[index + 1] = current
    }
    // 修改问题
    edit_question(question) {
        question.edit = true
    }
    // 添加问题
    add_quesiton(item) {
        this.questionnaire.questions.push(
            {
                id: 0,
                title: '',
                category: item.category,
                items: [],
                edit: true
            }
        )
    }
    // 添加问题选项
    add_question_item(question) {
        question.items.push({
            content: ''
        })
    }
    // 移除问题选项
    remove_question_item(question, index) {
        question.items.splice(index, 1)
    }
    // 问题选项上移
    up_question_item(question, index) {
        if (index <= 0) return;
        let current = question.items[index]
        let pre = question.items[index - 1]
        question.items[index] = pre
        question.items[index - 1] = current
    }
    // 问题选项下移
    down_question_item(question, index) {
        if (index >= question.items.length - 1) return;
        let current = question.items[index]
        let next = question.items[index + 1]
        question.items[index] = next
        question.items[index + 1] = current
    }
    // 保存问题
    save_question(question) {
        console.log(question)
        question.edit = false
        let ajax = new Ajax()
        ajax.success = data => {
        }
    }
    // 删除问题
    delete_question(index) {
        this.questionnaire.questions.splice(index, 1)
    }
    // 更新问题题号
    post_question_index(question) {
        if (question.id != 0) {
        }
    }

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
    post_questionnaire() {
    }
}
