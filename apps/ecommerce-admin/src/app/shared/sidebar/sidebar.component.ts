import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [RouterLink]
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
