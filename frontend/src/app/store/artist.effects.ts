import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MusicService } from '../services/music.service';
import {
  createArtistFailure,
  createArtistRequest,
  createArtistSuccess,
  fetchArtistFailure,
  fetchArtistRequest,
  fetchArtistSuccess,
  removeArtistRequest, removeArtistSuccess,
  updateArtistRequest,
  updateArtistSuccess
} from './artist.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { removeAlbumSuccess } from './album.actions';

@Injectable()

export class ArtistEffects {
  constructor(
    private actions: Actions,
    private musicService: MusicService,
    private router: Router
  ) {}


  fetchArtists = createEffect( () => this.actions.pipe(
    ofType(fetchArtistRequest),
    mergeMap( () => this.musicService.getArtists().pipe(
     map( artists => fetchArtistSuccess({artists})),
      catchError(() => of(fetchArtistFailure({error: 'Error!'})))
    ))
  ));

  createArtist = createEffect(() => this.actions.pipe(
    ofType(createArtistRequest),
    mergeMap(({data}) => this.musicService.createArtist(data).pipe(
      map(() => createArtistSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createArtistFailure({error: 'Wrong data'})))
    ))
  ));

  updateArtist = createEffect(() => this.actions.pipe(
    ofType(updateArtistRequest),
    mergeMap(({data}) => this.musicService.publishArtist(data).pipe(
      map(() => updateArtistSuccess())
    ))
  ));

  removeArtist = createEffect(() => this.actions.pipe(
    ofType(removeArtistRequest),
    mergeMap(({id}) => this.musicService.removeArtist(id).pipe(
      map(() => removeArtistSuccess())
    ))
  ));
}
