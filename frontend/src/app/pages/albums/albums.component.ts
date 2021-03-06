import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { AlbumModel } from '../../models/album.model';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchAlbumRequest, removeAlbumRequest, updateAlbumRequest } from '../../store/album.actions';
import { Publish } from '../../models/user.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.sass']
})
export class AlbumsComponent implements OnInit {
  albums: Observable<AlbumModel[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  apiUrl = environment.apiUrl
  artistName!: string;
  artistInfo!: string;
  id!: string;

  constructor(
    private musicService: MusicService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.albums = this.store.select(state => state.albums.albums);
    this.loading = this.store.select( state => state.albums.fetchLoading);
    this.error = this.store.select( state => state.albums.fetchError);
  }

  onLink(id: string, authorName: string, albumName: string) {
    void this.router.navigate(['/', id, authorName, albumName, 'tracks'])
  }

  onPublish(id: string, event: Event) {
    event.stopPropagation();
    const data: Publish = {
      id: id,
      isPublished: true
    }
    this.store.dispatch(updateAlbumRequest({data}));
    this.store.dispatch(fetchAlbumRequest({id: this.id}));
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.artistName = params['name'];
      this.id = params['id'];
      this.store.dispatch(fetchAlbumRequest({id: params['id']}))
    });
    this.albums.subscribe( album => {
      this.artistInfo = album[0]?.author.information;
    })
  }

  onRemove(id: string, event: Event) {
    event.stopImmediatePropagation();
    this.store.dispatch(removeAlbumRequest({id}));
  }
}
