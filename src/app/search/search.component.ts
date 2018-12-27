import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/Movie';
import { MockData } from '../mocks/mockSearchResults';
import { MovieService } from '../movie.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/debounceTime';
import { TemplateParseResult } from '@angular/compiler';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search:string;
  searchResults:Movie[] = MockData;
  query$:Subject<String> = new Subject<String>();
  fetchingData:boolean = false;

  constructor(private movieService:MovieService) { }

  setCurrentMovie(movie:Movie){
    this.movieService.changeSelectdMovie(movie);
  }

  ngOnInit() {
    this.query$
      .debounceTime(500)
      .map( terms => {this.fetchingData= true; return terms;})
      .subscribe(this.searchQuery.bind(this));
  }

  searchQuery(data:string){
    this.fetchingData=false;
    if (data.length > 0)
      this.movieService.seachMovie(data).subscribe((results) => {
        this.searchResults=results
      });
    else{      
      this.searchResults = []
    }
  }
}
