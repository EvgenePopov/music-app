import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { MusicService } from '../services/music.service';
import {
  createAlbumFailure,
  createAlbumRequest,
  createAlbumSuccess,
  fetchAlbumFailure,
  fetchAlbumRequest,
  fetchAlbumSuccess, removeAlbumRequest, removeAlbumSuccess, updateAlbumRequest, updateAlbumSuccess
} from './album.actions';
import { Router } from '@angular/router';

@Injectable()

export class AlbumsEffects {
  constructor(
    private actions: Actions,
    private musicService: MusicService,
    private router: Router
  ) {}


  fetchAlbums = createEffect( () => this.actions.pipe(
    ofType(fetchAlbumRequest),
    mergeMap( artistId => this.musicService.getArtistsAlbums(artistId.id).pipe(
      map( albums => fetchAlbumSuccess({albums})),
      catchError(() => of(fetchAlbumFailure({error: 'Error!'})))
    ))
  ));

  createAlbum = createEffect(() => this.actions.pipe(
    ofType(createAlbumRequest),
    mergeMap(({data}) => this.musicService.createAlbum(data).pipe(
      map(() => createAlbumSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createAlbumFailure({error: 'Wrong data'})))
    ))
  ));

  updateAlbum = createEffect(() => this.actions.pipe(
    ofType(updateAlbumRequest),
    mergeMap(({data}) => this.musicService.publishAlbum(data).pipe(
      map(() => updateAlbumSuccess())
    ))
  ));

  removeAlbum = createEffect(() => this.actions.pipe(
    ofType(removeAlbumRequest),
    mergeMap(({id}) => this.musicService.removeAlbum(id).pipe(
      map(() => removeAlbumSuccess())
    ))
  ));
}
