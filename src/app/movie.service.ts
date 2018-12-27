import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Movie } from './model/Movie';
import { ApiKey } from '../assets/ApiKey';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // the $ at the end of the name states that it's an Observable
  private selectedMovie$:Subject<Movie> = new Subject<Movie>();

  private baseApiUrl:string='https://api.themoviedb.org/3/search/movie/';
  private configApiUrl:string='https://api.themoviedb.org/3/configuration';
  private imageConfig={
    baseUrl:'',
    sizes:{
      backdrop:[],
      poster:[]
    }
  }
  constructor( private http:HttpClient) {
    this.setImageConfiguration();
   }

  get currentMovie(){
    return this.selectedMovie$;
  }

  seachMovie(query:string){
    let params = new HttpParams().set('api_key', ApiKey).set('query', query).set('include_adult', "true");
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
    return this.http.get<any>(this.baseApiUrl, {headers, params})
                    .map(res => res.results.map( (result:Movie) => {
                      return {...result, 
                              backdropUrl: this.createPhotoUrl(result.backdrop_path, true),
                              posterUrl: this.createPhotoUrl(result.poster_path, false)}
                    }));
  }
  setImageConfiguration(){
    let params = new HttpParams().set('api_key', ApiKey);
    this.http.get<any>(this.configApiUrl, {params})
      .map(res => res)
      .subscribe((config) => {
        this.imageConfig.baseUrl = config.images.base_url;
        this.imageConfig.sizes.backdrop = config.images.backdrop_sizes;
        this.imageConfig.sizes.poster = config.images.poster_sizes;
      })
  }
  createPhotoUrl(path:string, backdrop:boolean){
    if (!path)
      return "";
    const imgSize = backdrop ? this.imageConfig.sizes.backdrop[0] : this.imageConfig.sizes.poster[this.imageConfig.sizes.poster.length-1];    
    return `${this.imageConfig.baseUrl}${imgSize}${path}`;
  }
  changeSelectdMovie(movie:Movie){
    this.selectedMovie$.next(movie);
  }
}
