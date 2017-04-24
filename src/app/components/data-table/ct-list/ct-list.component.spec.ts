/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CtListComponent } from './ct-list.component';

describe('CtListComponent', () => {
  let component: CtListComponent;
  let fixture: ComponentFixture<CtListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
