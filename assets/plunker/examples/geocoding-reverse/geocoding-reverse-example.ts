import {Component, Output, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';

import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {TJsonViewerModule } from 't-json-viewer';

/**
 * @title Autocomplete overview
 */
@Component({
  selector: 'geocoding-reverse-example',
  templateUrl: 'geocoding-reverse-example.html',
  styleUrls: ['geocoding-reverse-example.css']
})
export class GeocodingReverseExample {
  geocodingCtrlGrp: FormGroup;
  geoResponse: any;
  geoRequest: any;
  candidates: Candidate[];
  downloading: boolean;
  latitude: number;
  longitude: number;
  private API_URL = 'https://www.ggs-docs.tk/Geocode/rest/GeocodeService/reverseGeocode';

  constructor(private formBuilder: FormBuilder, private http:Http) {
    this.geocodingCtrlGrp = formBuilder.group({
      country : '',
      latitude : null,
      longitude: null,
      coordSysName: null
    });
    this.downloading = false;
  }

  public geocode() : void{
    this.geoResponse = null;
    this.candidates = [];
    this.downloading = true;
    this.getCandidates().subscribe(res => {
      this.geoResponse = res.json();
      if(this.geoResponse != null){
        this.candidates = this.geoResponse.candidates;
      }
      this.downloading = false;
    }, error => {
      try{
        this.geoResponse = JSON.parse(error._body);
      }catch (e){
        this.geoResponse = error.statusText
      }
      this.downloading = false;
    });
  }

  public setCurrentPosition() {
    this.latitude = 42.6560116;
    this.longitude = -73.7563842;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.geocodingCtrlGrp.patchValue({
          latitude : this.latitude,
          longitude: this.longitude
        });
      });
    }else{
      this.geocodingCtrlGrp.patchValue({
        latitude : this.latitude,
        longitude: this.longitude
      });
    }
  }

  getCandidates() {
    this.geoRequest = {
      "preferences": {
        "returnAllCandidateInfo": true,
        "clientCoordSysName": "epsg:4326"
      },
      "points": [
        {
          "country": this.geocodingCtrlGrp.get('country').value,
          "geometry": {
            "type": "point",
            "coordinates": [
              this.geocodingCtrlGrp.get('longitude').value,
              this.geocodingCtrlGrp.get('latitude').value
            ]
          }
        }
      ]
    };
    return this.getData(this.geoRequest);
  }


  getData(body: any):Observable<any>{
    return this.http.post(this.API_URL, body);
  }
}

export interface Candidate{
  formattedStreetAddress: string;
  formattedLocationAddress: string;
}
