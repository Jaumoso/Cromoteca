import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AdvertInfoService } from '../services/advertInfo.service';
import { Location } from '@angular/common';
import { AdvertService } from '../services/advert.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtService } from '../services/jwt.service';

export interface AdvertTable {
  name: string;
  collection: string;
  state: string;
  quantity: number;
  price: number;
  button: any;
}

@Component({
  selector: 'app-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.scss']
})
export class AdvertsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'collection', 'state', 'quantity', 'price', 'date', 'button'];
  ELEMENT_DATA: AdvertTable[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  pageSize: number | undefined;
  pageIndex: number | undefined;
  length: number | undefined;

  constructor(
    private advertInfoService: AdvertInfoService,
    private advertService: AdvertService,
    private location: Location,
    private snackBar: MatSnackBar,
    private jwtService: JwtService,
    ) {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA); 
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token){
      if(!this.jwtService.isTokenExpired(token)){
        const decodedToken = this.jwtService.decodeToken(token);

        this.advertInfoService.getUserAdvertInfo(decodedToken._id)
        .subscribe((adverts) => {
          this.ELEMENT_DATA = adverts;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator!;
          this.dataSource.sort = this.sort!;
        });
      }
    }
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

  onPageChanged(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    return this.ELEMENT_DATA.slice(startIndex, endIndex);
  }

  deleteAdvert(advertId: string){
    this.advertService.deleteAdvert(advertId)
    .subscribe((advert) => {
      this.snackBar.open(
        'Anuncio eliminado', 
        "Aceptar",
        {
          verticalPosition: 'top',
          duration: 6000,
          panelClass: ['snackbar']
        });
        this.ngOnInit();
    });
  }

  goBack() {
    this.location.back();
  }

}
