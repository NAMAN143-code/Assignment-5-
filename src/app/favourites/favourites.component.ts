import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites: Array<any> = []
  constructor(private route: ActivatedRoute, private data: MusicDataService) { }
  private liveFavourites : any;

  ngOnInit(): void {

    this.liveFavourites = this.data.getFavourites().subscribe(data => this.favourites = data.tracks)
    
  }
  removeFromFavourites(id :any){
    this.data.removeFromFavourites(id).subscribe(data => this.favourites = data.tracks)
  }

}
