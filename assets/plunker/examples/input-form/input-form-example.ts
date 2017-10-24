import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";

/**
 * @title Inputs in a form
 */
@Component({
  selector: 'input-form-example',
  templateUrl: 'input-form-example.html',
  styleUrls: ['input-form-example.css'],
})
export class InputFormExample{
  formCtrl: FormControl;
  constructor(){
    this.formCtrl = new FormControl();
    this.formCtrl.valueChanges.subscribe( data => {
      console.log(data)
    })
  }

}
