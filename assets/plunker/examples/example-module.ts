
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

import {AutocompleteGetPostalInfoExample} from './autocomplete-get-postal-info/autocomplete-get-postal-info-example';
import {AutocompleteOverviewExample} from './autocomplete-overview/autocomplete-overview-example';
import {AutocompleteRestrictAreaExample} from './autocomplete-restrict-area/autocomplete-restrict-area-example';

export const EXAMPLE_COMPONENTS = {
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
};

export const EXAMPLE_LIST = [
  AutocompleteGetPostalInfoExample,
  AutocompleteOverviewExample,
  AutocompleteRestrictAreaExample,
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
