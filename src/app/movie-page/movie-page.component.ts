import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private  route: ActivatedRoute, private data: DataService) { }
  movieId;
  movies ;

  ngOnInit() {
    this.data.getData().subscribe(movie => this.movies = movie);
    this.route.queryParams.subscribe(id => this.movieId = id.id);
  }

  ngAfterViewInit() {
    console.log(this.movieId, this.movies);
  }
}
