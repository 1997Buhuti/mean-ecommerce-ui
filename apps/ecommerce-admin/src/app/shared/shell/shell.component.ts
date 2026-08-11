import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'admin-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
    imports: [SidebarComponent, RouterOutlet]
})
export class ShellComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
