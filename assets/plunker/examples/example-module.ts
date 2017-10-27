
/* tslint:disable */
/** DO NOT MANUALLY EDIT THIS FILE, IT IS GENERATED VIA GULP 'build-examples-module' */
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ExampleMaterialModule} from './material-module';

export interface LiveExample {
  title: string;
  component: any;
  additionalFiles?: string[];
  selectorName?: string;
}

import {AutocompleteCompressedAreaExample} from './autocomplete-compressed-area/autocomplete-compressed-area-example';
import {AutocompleteGetPostalInfoExample} from './autocomplete-get-postal-info/autocomplete-get-postal-info-example';
import {AutocompleteOverviewExample} from './autocomplete-overview/autocomplete-overview-example';
import {AutocompleteRestrictAreaExample} from './autocomplete-restrict-area/autocomplete-restrict-area-example';
import {GeocodingGeocodeExample} from './geocoding-geocode/geocoding-geocode-example';
import {GeocodingReverseExample} from './geocoding-reverse/geocoding-reverse-example';

export const EXAMPLE_COMPONENTS = {
  'autocomplete-compressed-area': {
    title: 'Autocomplete overview',
    component: AutocompleteCompressedAreaExample,
    additionalFiles: null,
    selectorName: null
  },
  'autocomplete-get-postal-info': {
    title: 'Autocomplete overview',
    component: AutocompleteGetPostalInfoExample,
    additionalFiles: null,
    selectorName: null
  },
  'autocomplete-overview': {
    title: 'Autocomplete overview',
    component: AutocompleteOverviewExample,
    additionalFiles: null,
    selectorName: null
  },
  'autocomplete-restrict-area': {
    title: 'Autocomplete overview',
    component: AutocompleteRestrictAreaExample,
    additionalFiles: null,
    selectorName: null
  },
  'geocoding-geocode': {
    title: 'Autocomplete overview',
    component: GeocodingGeocodeExample,
    additionalFiles: null,
    selectorName: null
  },
  'geocoding-reverse': {
    title: 'Autocomplete overview',
    component: GeocodingReverseExample,
    additionalFiles: null,
    selectorName: null
  },
};

export const EXAMPLE_LIST = [
  AutocompleteCompressedAreaExample,
  AutocompleteGetPostalInfoExample,
  AutocompleteOverviewExample,
  AutocompleteRestrictAreaExample,
  GeocodingGeocodeExample,
  GeocodingReverseExample,
];

@NgModule({
  declarations: EXAMPLE_LIST,
  entryComponents: EXAMPLE_LIST,
  imports: [
    ExampleMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ExampleModule { }
