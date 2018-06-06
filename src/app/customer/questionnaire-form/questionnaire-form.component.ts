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
    api = '/api/v1/customer_questionnaire'
    questionnaire_id: any
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
        this.get()
    }
    up_question(index) {
        console.log('up')
        if (index <= 0) return;
        let current = this.questionnaire.questions[index]
        let pre = this.questionnaire.questions[index - 1]
        this.questionnaire.questions[index] = pre
        this.questionnaire.questions[index - 1] = current
    }
    down_question(index) {
        console.log('down')
        if (index >= this.questionnaire.questions.length - 1) return;
        let current = this.questionnaire.questions[index]
        let next = this.questionnaire.questions[index + 1]
        this.questionnaire.questions[index] = next
        this.questionnaire.questions[index + 1] = current
    }
    add_quesiton(category) {
        this.questionnaire.questions.push(
            {
                title: '',
                items: []
            }
        )
    }
    add_question_item(question) {
        question.items.push({
            content: ''
        })
    }
    remove_question_item(question, index) {
        question.items.splice(index, 1)
    }
    up_question_item(question, index) {
        if (index <= 0) return;
        let current = question.items[index]
        let pre = question.items[index - 1]
        question.items[index] = pre
        question.items[index - 1] = current
    }
    down_question_item(question, index) {
        if (index >= question.items.length - 1) return;
        let current = question.items[index]
        let next = question.items[index + 1]
        question.items[index] = next
        question.items[index + 1] = current
    }
    save_question(question) {
        let ajax = new Ajax()
        ajax.success = data => {
        }

    }

    delete_question(index) {
        this.questionnaire.questions.splice(index, 1)
    }
    get() {
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
    post() {

    }
}
