import { Component, ViewEncapsulation, ElementRef, ViewChild, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '' };
  submitted = false;

  @ViewChild('mapCanvas') mapElement: ElementRef;

  constructor(
    public router: Router,
    public userData: UserData
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.signup.username);
      this.router.navigateByUrl('/app/tabs/schedule');
    }
  }

  async ngAfterViewInit() {
    
    const googleMaps = await getGoogleMaps(
      'AIzaSyB8pf6ZdFQj5qw7rc_HSGrhUwQKfIe9ICw'
    );
   // this.confData.getMap().subscribe((mapData: any) => {
      const mapEle = this.mapElement.nativeElement;

      const map = new googleMaps.Map(mapEle, {
        center: {lat: 46.7695547, lng: 23.5949514},
        zoom: 16,
        pitch: 60, // pitch in degrees
        bearing: -60,
        style: 'mapbox://styles/mapbox/streets-v9',
      });

     let marker = new googleMaps.Marker({
        map: map,
        draggable: true,
        animation: googleMaps.Animation.DROP,
        position: {lat: 46.7695547, lng: 23.5949514}
      });
      marker.addListener('click', () => {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(googleMaps.Animation.BOUNCE);
        }
        map.panTo({lat: 46.7692947, lng: 23.5945914});
      });

      var directionsService = new googleMaps.DirectionsService();
      var directionsDisplay = new googleMaps.DirectionsRenderer({
        map: map
      });
      directionsService.route({
        origin: {
          'placeId': 'ChIJObEjxYgOSUcROuiXXeZ3SDU'
        },
        destination: {
          'placeId': 'ChIJ1feHaYYOSUcRx0aGWokmHYA'
        },
        waypoints: [{
          stopover: true,
          location: {
            'placeId': "ChIJSU_16ogOSUcRbucYAQHw8N0"
          }
        }],
        optimizeWaypoints: true,
        travelMode: googleMaps.TravelMode.DRIVING
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          setTimeout(function (){
            map.panTo({lat: 46.766701, lng: 23.5694203});
            setTimeout(function (){
              map.panTo({lat: 46.7654517, lng: 23.5702465});
              }, 1000);
          }, 1000);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
      
      directionsDisplay.addListener('click', () => {
        if (directionsDisplay.getAnimation() !== null) {
          directionsDisplay.setAnimation(null);
        } else {
          directionsDisplay.setAnimation(googleMaps.Animation.BOUNCE);
        }
      //  map.panTo({lat: 46.766701, lng: 23.5694203});
        
      });


      googleMaps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });
   // }
    //);
    
  }


}
function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });
}
