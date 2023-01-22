import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { CollectionsComponent } from '../collections/collections.component';
import { MarketComponent } from '../market/market.component';
import { ProfileComponent } from '../profile/profile.component';

/* import { ContactComponent } from '../contact/contact.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';  */

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'about', component: AboutComponent},
    { path: 'collections', component: CollectionsComponent},
    { path: 'market', component: MarketComponent},
    { path: 'profile', component: ProfileComponent},
    
    { path: '', redirectTo: '/home', pathMatch: 'full'}
];