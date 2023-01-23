import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService,
    private route: ActivatedRoute) { }

  user: User | undefined;
  errMsg: string | undefined; // TODO:

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        return this.userService.getUser(params['get']('id'));
      }))
      .subscribe(userData => {
        this.user = userData;
      });
  }
}
