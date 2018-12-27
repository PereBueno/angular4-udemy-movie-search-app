import { Component, OnInit, Input} from '@angular/core';
import { Movie } from '../model/Movie';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movie:Movie = {}

  constructor() { }

  ngOnInit() {
  }

  backdropStyle = () => ({
    'background': `linear-gradient(180deg, rgba(0, 0, 0, .7), transparent), url(${this.movie.backdropUrl})`,
    'background-size': 'cover'
  })
}
