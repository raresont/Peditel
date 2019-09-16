import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoadingController, ModalController } from '@ionic/angular';

import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';

import { AlertController, ToastController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { CategoryService } from '../../providers/category.service';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
  styleUrls: ['./support.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SupportPage {
//  @ViewChild('scheduleList') scheduleList: List;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
 currentCategory: number = null;
  shownSessions: number = 1;
  groups: any = [];
  confDate: string;
  stories:any;
  storiesB:any;


  submitted = false;
  supportMessage: string;
  safeURL:any;
  url:string = "https://www.youtube.com/watch?v=VaI7jfQHFcI"// + "&output=embed"
  excludeTracks: any = [];

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private _sanitizer: DomSanitizer,

    public modalCtrl: ModalController,
    public router: Router,
    public confData: ConferenceData,
    private storage: Storage,
    public events: Events,
    private categoryService: CategoryService
  ) { 
    var url = this.url.replace("watch?v=", "embed/");
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(url);

    this.categoryService.onCategoryChosed.subscribe( (data:number) => {
      this.updateScheduleWithArgument(data);
    });
  }


  updateScheduleWithArgument(id? :number) {
    //  console.log("here we don't trigger");
   //   this.events.subscribe('menu:opened', (id) => {
        // your action here
        console.log(id);
        //console.log('menu:opened');
        if(id == 99 ) {
          this.updateSchedule();
        } else {
          this.stories = this.storiesB.filter((item) => {
            return (item.name.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1)
            && (item.categories[0]== id || item.categories[1] == id) ;
          });
          this.shownSessions = this.stories.length;
        }
     // });
   }


  async ionViewDidEnter() {
    const toast = await this.toastCtrl.create({
      message: 'This does not actually send a support request.',
      duration: 3000
    });
  //  await toast.present();

        this.updateSchedule();
  }

  async submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.supportMessage = '';
      this.submitted = false;

      const toast = await this.toastCtrl.create({
        message: 'Your support request has been sent.',
        duration: 3000
      });
      await toast.present();
    }
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
 //   if (this.scheduleList) {
  //    this.scheduleList.closeSlidingItems();
  //  }
/*
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }*/
  this.confData.getStories().subscribe((speakers: any[]) => {
    this.stories = speakers;
  });
}
/*
  updateSchedule() {
      this.stories = this.storiesB.filter((item) => {
          return (item.name.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1) ;

      });
      this.shownSessions = this.stories.length;
  }
*/

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: ScheduleFilterPage,
   //   componentProps: { excludedTracks: this.excludeTracks }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
  //    this.excludeTracks = data;
      this.updateSchedule();
    }
  }

  goToSessionDetail(sessionData: any) {
    // go to the session detail page
    // and pass in the session data
    this.router.navigateByUrl(`app/tabs/(schedule:session/${sessionData.id})`);
  }
}
