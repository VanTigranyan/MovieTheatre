import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'info', component: MovieInfoComponent },
    { path: '', redirectTo: 'info', pathMatch: 'full'},
    { path: 'movie-page', component: MoviePageComponent }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
