import {Component, OnInit, Output} from '@angular/core';
import {DataService} from '../data.service';
import {PaginatePipe} from 'ng2-pagination';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {

  constructor(private data: DataService, private router: Router) {
  }

  movieInfoArray;
  movieSrc;

  ix(index) {
    return index % 2 === 0;
  }

  ngOnInit() {
    this.data.getData().subscribe(data => this.movieInfoArray = data);
  }

  openMoviePage(index) {
    this.router.navigate([
      '/movie-page'
    ], {
      queryParams: {
        id: index
      }
    })
    ;
  }

}
