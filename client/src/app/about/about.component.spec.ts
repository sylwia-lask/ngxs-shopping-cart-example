import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AboutComponent } from './about.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AboutComponent', () => {
    let component: AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;
    let title: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AboutComponent],
            imports: [FontAwesomeModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AboutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        title = fixture.debugElement.query(By.css('.card-title'));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have title About', () => {
        expect(title.nativeElement.textContent.trim()).toBe('About');
    });
});
