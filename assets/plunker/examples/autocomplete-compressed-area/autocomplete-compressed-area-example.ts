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
  selector: 'autocomplete-compressed-area-example',
  templateUrl: 'autocomplete-compressed-area-example.html',
  styleUrls: ['autocomplete-compressed-area-example.css']
})
export class AutocompleteCompressedAreaExample {
  restrictedArea: FormGroup;
  geoResponse: any;
  geoRequest: any;
  candidates: Candidate[];
  downloading: boolean;
  latitude: number;
  longitude: number;
  private API_URL = 'https://www.ggs-docs.tk/Geocode/rest/GeocodeService/interactive';

  constructor(private formBuilder: FormBuilder, private http:Http) {
    this.restrictedArea = formBuilder.group({
      address : '',
      distance : 1000,
      distanceUnits : 'MILES',
      latitude : null,
      longitude: null,
      compressed: true
    });
    this.downloading = false;

    this.restrictedArea.valueChanges.debounceTime(1000).subscribe( data => {
      this.geoResponse = null;
      this.candidates = [];
      this.downloading = true;
      this.getCandidates(data).subscribe(res => {
        this.geoResponse = res.json();
        if(this.geoResponse != null){
          this.candidates = this.geoResponse.candidates;
        }
        this.downloading = false;
      });
    });
  }

  public setCurrentPosition() {
    this.latitude = 42.6560116;
    this.longitude = -73.7563842;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.restrictedArea.patchValue({
          latitude : this.latitude,
          longitude: this.longitude
        });
      });
    }else{
      this.restrictedArea.patchValue({
        latitude : this.latitude,
        longitude: this.longitude
      });
    }
  }

  getCandidates(data: any) {
    let origin = null;
    if(data.latitude != null && data.longitude != null
      && data.latitude != 0 && data.longitude != 0){
      origin = [data.longitude, data.latitude];
    }
    if(data.address && data.address.length < 3){
      return new EmptyObservable();
    }
    this.geoRequest = {
      "preferences": {
        "maxReturnedCandidates": 10,
        "clientCoordSysName" : "EPSG:4326",
        "originXY" : origin,
        "distance" : data.distance,
        "distanceUnits" : data.distanceUnits,
        "customPreferences" : {
          "COMPRESSED_AREA_RESULT" : data.compressed.toString()
        }
      },
      "address": {
        "mainAddressLine": data.address
      }
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
