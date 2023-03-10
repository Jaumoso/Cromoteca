import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AdvertInfoService } from '../services/advertInfo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort,} from '@angular/material/sort';

export interface AdvertTable {
  name: string;
  collection: string;
  user: string;
  state: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'collection', 'user', 'state', 'quantity', 'price'];
  ELEMENT_DATA: AdvertTable[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  pageSize: number | undefined;
  pageIndex: number | undefined;
  length: number | undefined;

  constructor(private advertInfoService: AdvertInfoService,) {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA); 
  }

  ngOnInit() {
    this.advertInfoService.getAllAdvertsInfo()
    .subscribe((adverts) => {
        this.ELEMENT_DATA = adverts;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // TODO:
  onPaginatorChange(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.length = e.length;

    this.dataSource = this.dataSource
  }
  
}