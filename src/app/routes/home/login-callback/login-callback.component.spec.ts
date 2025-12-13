import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCallbackComponent } from './login-callback.component';

describe('AuthCallbackComponent', () => {
  let component: LoginCallbackComponent;
  let fixture: ComponentFixture<LoginCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCallbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
