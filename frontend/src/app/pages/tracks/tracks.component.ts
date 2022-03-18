import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { TracksService } from '../../services/tracks.service';
import { Observable, Subscription } from 'rxjs';
import { TracksModel } from '../../models/tracks.model';
import { fetchTracksRequest } from '../../store/tracks.actions';
import { User } from '../../models/user.model';
import { AlbumModel } from '../../models/album.model';
import { environment } from '../../../environments/environment';
import { createTrackHistoryRequest } from '../../store/trackHistory.actions';
import { TrackHistoryData } from '../../models/trackHistory.model';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.sass']
})
export class TracksComponent implements OnInit, OnDestroy {
  tracks: Observable<TracksModel[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  albumName!: string;
  user: Observable<null | User>
  userSubscription!: Subscription;
  userData!: User;

  constructor(private tracksService: TracksService, private route: ActivatedRoute, private store: Store<AppState>) {
    this.tracks = this.store.select(state => state.tracks.tracks);
    this.loading = this.store.select( state => state.albums.fetchLoading);
    this.error = this.store.select( state => state.albums.fetchError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.albumName = params['name'];
      this.store.dispatch(fetchTracksRequest({id: params['id']}))
    });
    this.userSubscription = this.user.subscribe( user => {
      if (user) {
        this.userData = <User>user;
      }
    })
  }

  addToHistory(trackId: string) {
    const trackHistoryData: TrackHistoryData = {
      track: trackId,
      token: this.userData.token
    }
    this.store.dispatch(createTrackHistoryRequest({data: trackHistoryData}))
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}