import { Component } from '@angular/core';
import { Ajax } from './utils/ajax'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    constructor() {
        this.get()
    }
    get() {

    }
}
