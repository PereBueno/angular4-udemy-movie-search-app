import { Component } from '@angular/core';
import { Movie } from './model/Movie';
import { MockData } from './mocks/mockSearchResults';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentMovie:Movie;

  constructor(private movieService:MovieService){
    movieService.currentMovie.subscribe((movie) => this.currentMovie = movie);
  }

  startNewSearch(){
    this.movieService.changeSelectdMovie(null);
  }
}
