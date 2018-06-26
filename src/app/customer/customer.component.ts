import { Component } from '@angular/core';
import { Router } from '@angular/router'

import { Ajax } from '../utils/ajax'
@Component({
    selector: 'customer-root',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
    constructor(private router: Router) {

    }
    get() {

    }
    back() {
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
