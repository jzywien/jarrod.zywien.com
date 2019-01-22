import { Directive, ElementRef, HostListener, HostBinding, Renderer2 } from '@angular/core';

@Directive({
  selector: 'input[activeInput], select[activeInput], textarea[activeInput]',
  })
export class ActiveInputDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {  }

  @HostListener('focus') onfocus() {
    this.setActive(true);
    console.log('input focus');
  }

  @HostListener('blur') onblur() {
    this.setActive(false);
    console.log('input blur');
  }

  setActive(active: boolean) {
    const value = this.el.nativeElement.value;
    const nextSibling = this.renderer.nextSibling(this.el.nativeElement);
    if (active || value !== '') {
      this.renderer.addClass(nextSibling, 'active');
    } else {
      this.renderer.removeClass(nextSibling, 'active');
    }
  }

}
