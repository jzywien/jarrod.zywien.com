import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveInputDirective } from './active-input/active-input.directive';
import { SocialLoginButtonComponent } from './social-button/social-login-button.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ActiveInputDirective,
    SocialLoginButtonComponent
  ],
  declarations: [
    ActiveInputDirective,
    SocialLoginButtonComponent
  ]
})
export class SharedModule { }
