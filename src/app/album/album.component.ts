import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  // album = albumData; // static data display 
  constructor(private snackBar : MatSnackBar , private route : ActivatedRoute, private data: MusicDataService) { }

  trackID :any = {}
  album : any = {}  //dynamic display 
  private liveAlbumID : any;
  private liveAlbumSubscription : any;
 
  

  ngOnInit(): void {

    this.liveAlbumID =  this.route.paramMap.subscribe((p) => {    
      this.trackID = p.get('id');
    });


    this.liveAlbumSubscription = this.data.getAlbumbyID(this.trackID).subscribe(data => this.album = data)

   
    
  
  }
  addToFavourites(trackID: any){
    if(this.data.addToFavourites(this.trackID)){
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    }
  }
  ngOnDestroy(): void{
    this.liveAlbumID?.unsubscribe();
    this.liveAlbumSubscription?.unsubscribe();
  }

}
