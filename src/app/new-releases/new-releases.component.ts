import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';

import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {
  releases : any = {};
  private liveMusicSubscription : any
  constructor(private info : MusicDataService) { }

  ngOnInit(): void {
    this.liveMusicSubscription = this.info.getNewReleases().subscribe(info => this.releases = info);
  }
  ngOnDestroy(){
    this.liveMusicSubscription.unsubscribe();
  }
}
