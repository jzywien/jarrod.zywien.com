import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveInputDirective } from './active-input/active-input.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ActiveInputDirective
  ],
  declarations: [ActiveInputDirective]
})
export class SharedModule { }
