import { Component, OnInit } from '@angular/core';

interface Options {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
  }

  searchText: String = '';

    options: Options[] = [
    {value: 'CARTAS', viewValue: 'Cartas'},
    {value: 'CROMOS', viewValue: 'Cromos'},
    {value: 'STAKS', viewValue: 'Staks'},
  ];

}
