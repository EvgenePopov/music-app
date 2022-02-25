export class AlbumModel {
  constructor(
    public _id: string,
    public name: string,
    public author: { _id: string, name: string },
    public year: string,
    public image: string
  ) {}
}

export interface ApiAlbumData {
  _id: string,
  name: string,
  author: {_id: string, name: string},
  year: string,
  image: string
}
