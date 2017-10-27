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
  selector: 'geocoding-geocode-example',
  templateUrl: 'geocoding-geocode-example.html',
  styleUrls: ['geocoding-geocode-example.css']
})
export class GeocodingGeocodeExample {
  geocoding: FormGroup;
  geoResponse: any;
  geoRequest: any;
  candidates: Candidate[];
  downloading: boolean;
  latitude: number;
  longitude: number;
  private API_URL = 'https://www.ggs-docs.tk/Geocode/rest/GeocodeService/geocode';

  constructor(private formBuilder: FormBuilder, private http:Http) {
    this.geocoding = formBuilder.group({
      address : '',
      country : ''
    });
    this.downloading = false;
  }

  geocode() : void{
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
      this.geoResponse = JSON.parse(error._body);
      this.downloading = false;
    });
  }

  getCandidates() {
    this.geoRequest = {
      "type": "ADDRESS",
      "preferences": {
        "returnAllCandidateInfo": true
      },
      "addresses": [
        {
          "mainAddressLine": this.geocoding.get('address').value,
          "country": this.geocoding.get('country').value
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
