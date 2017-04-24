/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArListComponent } from './ar-list.component';

describe('ArListComponent', () => {
  let component: ArListComponent;
  let fixture: ComponentFixture<ArListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
