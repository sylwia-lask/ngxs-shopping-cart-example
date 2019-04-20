import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ContactComponent } from './contact.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AboutComponent', () => {
    let component: ContactComponent;
    let fixture: ComponentFixture<ContactComponent>;
    let title: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContactComponent],
            imports: [FontAwesomeModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        title = fixture.debugElement.query(By.css('.card-title'));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have title About', () => {
        expect(title.nativeElement.textContent.trim()).toBe('Contact');
    });
});