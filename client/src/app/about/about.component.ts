import { Component } from '@angular/core';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent {
    faAddressBook = faAddressBook;
}
