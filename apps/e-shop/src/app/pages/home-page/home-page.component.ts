import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'mean-ecommerce-ui-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    imports: [ButtonModule]
})
export class HomePageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
