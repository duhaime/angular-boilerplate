// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

// Services
import { DataService } from './services/data.service';

// Components
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home.component';
import { AboutComponent } from './components/about.component';

// Data
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

// Styles
import './styles/style.css';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  // List imported components so Angular recognizes custom html tags
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ DataService ]
})

export class AppModule { }