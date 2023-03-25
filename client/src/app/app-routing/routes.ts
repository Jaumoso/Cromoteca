import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { CollectionsComponent } from '../collections/collections.component';
import { MarketComponent } from '../market/market.component';
import { ProfileComponent } from '../profile/profile.component';
import { CollectiondetailsComponent } from '../collectiondetails/collectiondetails.component';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { PasswordchangeComponent } from '../passwordchange/passwordchange.component';
import { CreateaccountComponent } from '../createaccount/createaccount.component';
import { FillCollectionComponent } from '../fill-collection/fill-collection.component';
import { AdvertsComponent } from '../adverts/adverts.component';
import { AdvertdetailsComponent } from '../advertdetails/advertdetails.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'about', component: AboutComponent},
    { path: 'collections', component: CollectionsComponent},
    { path: 'collectiondetails/:id', component: CollectiondetailsComponent},
    { path: 'market', component: MarketComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'editprofile', component: EditprofileComponent},
    { path: 'passwordchange', component: PasswordchangeComponent},
    { path: 'createaccount', component: CreateaccountComponent},
    { path: 'fillcollection/:id', component: FillCollectionComponent},
    { path: 'adverts', component: AdvertsComponent},
    { path: 'advertdetails/:id', component: AdvertdetailsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'}
];