import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MusicDataService } from '../music-data.service';


@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {


  private liveArtistSubscription: any;
  private liveAlbumsSubscription: any;
  private getliveId: any;
  curID: any = {}

  constructor(private data: MusicDataService, private route: ActivatedRoute ) { }
  
  //dynamic display 
  artists: any = {}
  albums: any = {}

  ngOnInit(): void {
    this.getliveId = this.route.paramMap.subscribe((p) => {
      
      this.curID = p.get('id');

    });

    // this.getliveId = this.route.snapshot.params['id'].subscribe( (getID :any) => this.curID = getID);

    this.liveArtistSubscription = this.data.getArtistbyID(this.curID).subscribe(data=> {
      console.log(data)
      return this.artists = data;
    } )

    this.liveAlbumsSubscription = this.data.getAlbumByArtistID(this.curID)
      .subscribe(data => 
        {
          console.log(data.items)
          return this.albums = data.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() === curValue.name.toUpperCase()) === index);
        } );
        console.log(this.albums)
   
  }
  ngOnDestroy(): void {
      this.liveArtistSubscription?.unsubscribe();
      this.liveAlbumsSubscription?.unsubscribe();
      this.getliveId?.unsubscribe();
  }
}
