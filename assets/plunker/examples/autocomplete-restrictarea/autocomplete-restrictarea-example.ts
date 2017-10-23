import {Component, Output} from '@angular/core';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {TJsonViewerModule } from 't-json-viewer';

/**
 * @title Autocomplete overview
 */
@Component({
  selector: 'autocomplete-restrictarea-example',
  templateUrl: 'autocomplete-restrictarea-example.html',
  styleUrls: ['autocomplete-restrictarea-example.css']
})
export class AutocompleteRestrictAreaExample {
  restrictedArea: FormGroup;
  geoResponse: any;
  candidates: Candidate[];
  downloading: boolean;
  private API_URL = 'http://ar001af-tro1:8082/Geocode/rest/GeocodeService/interactive';

  constructor(private formBuilder: FormBuilder, private http:Http) {
    this.restrictedArea = formBuilder.group({
      address : '',
      country : '',
      distance : 150,
      distanceUnits : 'METERS',
      latitude : null,
      longitude: null
    });
    this.downloading = false;

    this.restrictedArea.valueChanges.subscribe( data => {
      console.log(data);

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

  getCandidates(data: any) {
    let origin = null;
    if(data.latitude != null && data.longitude != null
      && data.latitude != 0 && data.longitude != 0){
      origin = [data.longitude, data.latitude];
    }
    let body = {
      "preferences": {
        "maxReturnedCandidates": 10,
        "clientCoordSysName" : "EPSG:4326",
        "originXY" : origin,
        "distance" : data.distance,
        "distanceUnits" : data.distanceUnits
      },
      "address": {
        "mainAddressLine": data.address,
        "country" : data.country
      }
    };
    return this.getData(body);
  }


  getData(body: any):Observable<any>{
    return this.http.post(this.API_URL, body);
  }
}

export interface Candidate{
  formattedStreetAddress: string;
  formattedLocationAddress: string;
}
