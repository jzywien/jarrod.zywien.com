import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'social-login-button',
  templateUrl: './social-login-button.component.html',
  styleUrls: ['./social-login-button.component.scss'],
})
export class SocialLoginButtonComponent implements OnInit {

  @Input() provider: string;

  constructor() {}

  ngOnInit(): void {
  }
}