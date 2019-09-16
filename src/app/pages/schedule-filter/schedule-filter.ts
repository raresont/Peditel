import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';

//import { ConferenceData } from '../../providers/conference-data';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html',
  styleUrls: ['./schedule-filter.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScheduleFilterPage implements AfterViewInit {

  //tracks: {name: string, isChecked: boolean}[] = [];
  about:any;

  constructor(
   // public confData: ConferenceData,
    public modalCtrl: ModalController,
    private storage: Storage
  ) { }

  // TODO use the ionViewDidEnter event
  ionViewDidEnter() {
    this.storage.ready().then(()=> {
    //  console.log("Storage is ready");
       this.storage.get("about").then(res => {
   //      console.log(res);
         if(this.about = res) {
    //       console.log(this.about);
        //   console.log(this.about[1].name);
         }
       })
  
     }
     );
  }

  ngAfterViewInit() {
    // passed in array of track names that should be excluded (unchecked)
 //   const excludedTrackNames = []; // this.navParams.data.excludedTracks;
/*
    this.confData.getTracks().subscribe((trackNames: string[]) => {
      trackNames.forEach(trackName => {
        this.tracks.push({
          name: trackName,
          isChecked: (excludedTrackNames.indexOf(trackName) === -1)
        });
      });
    });
    */
  }

  resetFilters() {
    // reset all of the toggles to be checked
   // this.tracks.forEach(track => {
   //   track.isChecked = true;
   // });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
   // const excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
   // this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }
}
