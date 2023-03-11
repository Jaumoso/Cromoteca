import { Component, OnInit } from '@angular/core';
import { AdvertInfoService } from '../services/advertInfo.service';
import { Advert } from '../shared/advert';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

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
export class MarketComponent implements OnInit {

  constructor(
    private advertInfoService: AdvertInfoService,
    private _liveAnnouncer: LiveAnnouncer
    ) { }

    ngOnInit() {
      this.advertInfoService.getAllAdvertsInfo()
      .subscribe((adverts) => {
          this.ELEMENT_DATA = adverts;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      });
    }

  displayedColumns: string[] = ['name', 'collection', 'user', 'state', 'quantity', 'price'];
  ELEMENT_DATA: AdvertTable[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sort: MatSort | undefined;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort!;
  }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
      // This example uses English messages. If your application supports
      // multiple language, you would internationalize these strings.
      // Furthermore, you can customize the message to add additional
      // details about the values being sorted.
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }
}