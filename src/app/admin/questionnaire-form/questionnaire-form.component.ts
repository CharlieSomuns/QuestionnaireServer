import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ajax } from '../../utils/ajax'
import { sessionstorage } from '../../utils/storage'

@Component({
    selector: 'admin-questionnaire-form',
    templateUrl: './questionnaire-form.component.html',
    styleUrls: ['./questionnaire-form.component.css']
})
export class QuestionnaireViewComponent implements OnInit {
    // 问卷接口
    api = '/api/v1/admin_questionnaire'
    // 问卷id
    questionnaire_id: any

    now = new Date()
    // 问卷对象
    questionnaire: any = {
        title: '',
        deadline: this.now.getFullYear() + '-' + (this.now.getMonth() + 1) + '-' + this.now.getDate(),
        quantity: 100,
        questions: [],
        comments:[]
    }
    new_comment=""
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
    // 提交审核
    comment(agree){
        if(!agree && this.new_comment===''){
            alert('请填写批注')
            return false
        }
        let that=this
        let ajax=new Ajax()
        ajax.success=(data)=>{
            alert('提交成功')
            window.history.back()
        }
        ajax.put('/api/v1/questionnaire_comment',{
            questionnaire_id:that.questionnaire_id,
            is_agree:agree,
            comment:that.new_comment
        })
    }
    
}
