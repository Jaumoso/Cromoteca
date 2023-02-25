import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCommonModule } from '@angular/material/core';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { baseURL } from './shared/baseurl';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CollectionsComponent } from './collections/collections.component';
import { MarketComponent } from './market/market.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { CollectiondetailsComponent } from './collectiondetails/collectiondetails.component';
import { NewsComponent } from './news/news.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { LibraryComponent } from './library/library.component';
import { AuthInterceptorService } from './services/authInterceptor.service';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { AddToLibraryComponent } from './add-to-library-dialog/add-to-library-dialog.component';
import { CloseSessionDialogComponent } from './close-session-dialog/close-session-dialog.component';
import { FillCollectionComponent } from './fill-collection/fill-collection.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    CollectionsComponent,
    MarketComponent,
    ProfileComponent,
    AboutComponent,
    CollectiondetailsComponent,
    NewsComponent,
    EditprofileComponent,
    LibraryComponent,
    PasswordchangeComponent,
    CreateaccountComponent,
    AddToLibraryComponent,
    CloseSessionDialogComponent,
    FillCollectionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    MatListModule,
    FontAwesomeModule,
    MatCardModule,
    HttpClientModule,
    MatCommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    ScrollingModule,
  ],
  providers: [
    { provide: 'BaseURL', useValue: baseURL },
    { provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true 
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
