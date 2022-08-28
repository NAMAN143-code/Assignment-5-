import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  results: any = {}
  searchQuery: any ={}
  
  constructor(private route: ActivatedRoute, private data: MusicDataService) { }

  private  livequeryParams :any
  private liveSearch : any


  ngOnInit(): void {
   
    this.livequeryParams = this.route.paramMap.subscribe((queryParams) => {
      
      this.searchQuery = queryParams.get('q');

    });

    this.liveSearch = this.data.searchArtists(this.searchQuery).subscribe(data => this.results = data.artists.items)
   

  }
  ngOnDestroy(): void{
    this.liveSearch?.unsubscribe();
    this.livequeryParams?.unsubscribe();
  }
}
