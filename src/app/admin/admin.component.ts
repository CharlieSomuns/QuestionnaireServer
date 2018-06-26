import { Component } from '@angular/core';
import { Router } from '@angular/router'

import { Ajax } from '../utils/ajax'

@Component({
    selector: 'admin-root',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent {
    title = 'app';

    constructor(private router: Router) {

    }
    get() {

    }
    back(){
        window.history.back()
    }
    logout() {
        let that = this
        let ajax = new Ajax()
        ajax.success = (data) => {
            this.router.navigateByUrl('/')
        }
        ajax.delete('/api/v1/session', {})
    }
}
