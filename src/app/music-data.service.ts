import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';
import { query } from 'express';
import { AlbumComponent } from './album/album.component';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  
   
  favouritesList : Array<any> = [];

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>(`https://api.spotify.com/v1/browse/new-releases`, { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }

  getArtistbyID(id: any): Observable<SpotifyApi.SingleArtistResponse>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.SingleArtistResponse>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }
  
  // getAlbumsbyArtistID(id:any): Observable<SpotifyApi.ArtistsAlbumsResponse>{
   
  //   let queryParams = {
  //     include_groups: ["artist" , "single"],
  //     limit : 50
  //   }
  //   return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
  //     return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(`https://api.spotify.com/v1/artists/${id}/albums`, { headers: { "Authorization": `Bearer ${token}` }, params: queryParams});
  //   }));
    
  // }

  getAlbumByArtistID(id: any): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`,{ headers: { Authorization: `Bearer ${token}` } });
      }));
  }

  getAlbumbyID(id:any):Observable<SpotifyApi.SingleAlbumResponse>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.SingleAlbumResponse>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));   

  }

  searchArtists(searchString:any):Observable<SpotifyApi.ArtistSearchResponse>{

   let queryParams = {
    q: searchString,
    type: "artist",
    limit: 50
   }

    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.ArtistSearchResponse>("https://api.spotify.com/v1/search", { headers: { "Authorization": `Bearer ${token}` }, params: queryParams });
    }));  
  }

  addToFavourites(id:any): boolean{
    if(id != null && id !=undefined)
    {
      if(this.favouritesList.length<= 50){
      this.favouritesList.push(id)
      return true;
      }
      else return false;
      
    }
    else return false;
  }

  removeFromFavourites(id:any):Observable<any>{
   let  indexToBeRemoved = this.favouritesList.indexOf(id);
   this.favouritesList.splice(indexToBeRemoved, 1);
   return this.getFavourites()
  }

   
  getFavourites():Observable<any>{
    if(this.favouritesList.length > 0){
      let queryParams = {
        ids: this.favouritesList.join()
      }

      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>(`https://api.spotify.com/v1/tracks`, { headers: { "Authorization": `Bearer ${token}` }, params: queryParams });
      }));
    }
    else {
      return new Observable(o => {o.next([])});
    }


  }

}