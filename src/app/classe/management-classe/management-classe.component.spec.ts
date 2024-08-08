import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementClasseComponent } from './management-classe.component';

describe('ManagementClasseComponent', () => {
  let component: ManagementClasseComponent;
  let fixture: ComponentFixture<ManagementClasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementClasseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagementClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
