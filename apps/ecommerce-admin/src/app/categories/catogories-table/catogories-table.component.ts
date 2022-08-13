import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mean-ecommerce-ui-catogories-table',
  templateUrl: './catogories-table.component.html',
  styleUrls: ['./catogories-table.component.scss'],
})
export class CatogoriesTableComponent implements OnInit {
  categories = [
    {
      id: 1,
      name: 'Test Category 12',
      icon: 'ico-1',
      category: 'electronics',
    },
    {
      id: 11,
      name: 'Test Category 15',
      icon: 'ico-1',
      category: 'electronics',
    },
    {
      id: 13,
      name: 'Test Category 124',
      icon: 'ico-1',
      category: 'electronics',
    },
    {
      id: 4,
      name: 'Test Category 17',
      icon: 'ico-1',
      category: 'electronics',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
