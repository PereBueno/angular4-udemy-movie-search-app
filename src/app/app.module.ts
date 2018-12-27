import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { HeaderComponent } from './header.component';
import { DisplayMovieComponent } from './display-movie.component';
import { FooterComponent } from './footer.component';
import { MovieService } from './movie.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MovieCardComponent,
    HeaderComponent,
    DisplayMovieComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
