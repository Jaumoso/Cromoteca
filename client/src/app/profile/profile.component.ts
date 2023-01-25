import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { mergeMap, switchMap } from 'rxjs';
import { AddressService } from '../services/address.service';
import { UserService } from '../services/user.service';
import { Address } from '../shared/address';
import { User } from '../shared/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private route: ActivatedRoute
    ) { }

  user: User | undefined;
  address: Address | undefined;
  errMsg: string | undefined; // TODO:

  async ngOnInit() {
    // GET User y Address
    this.route.paramMap.pipe(
      mergeMap((params: Params) => { return this.userService.getUser('63bb22866e873bed253924fe') }),
      mergeMap((userData) => { this.user = userData; return this.addressService.getAddress(userData.address)}))
      .subscribe(addressData => {
        this.address = addressData;
      });
    }
  }
