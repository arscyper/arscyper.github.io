import {Component, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

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
  selector: 'autocomplete-overview-example',
  templateUrl: 'autocomplete-overview-example.html',
  styleUrls: ['autocomplete-overview-example.css']
})
export class AutocompleteOverviewExample {
  mainAddrCtrl: FormControl;
  toggleResponse : any;
  geoResponse: any;
  candidates: Candidate[];
  private API_URL = 'https://www.ggs-docs.tk/Geocode/rest/GeocodeService/interactive';

  constructor(private http:Http) {
    this.mainAddrCtrl = new FormControl();
    this.mainAddrCtrl.valueChanges.debounceTime(1000).subscribe( data => {
      this.geoResponse = null;
      this.candidates = [];
      this.getCandidates(data).subscribe(res => {
        this.geoResponse = res.json();
        if(this.geoResponse != null){
          this.candidates = this.geoResponse.candidates;
        }
      });
    });
  }

  getCandidates(name: string) {
    let body = {
      preferences : {
        maxReturnedCandidates : 10
      },
      address : {
        mainAddressLine : name
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
