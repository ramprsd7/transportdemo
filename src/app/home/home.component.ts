import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  autocomplete: google.maps.places.Autocomplete;
  tripArray = [];
  tripForm: any;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.loadTripForm();
  }


  loadTripForm() {
    this.tripForm = new FormGroup({
      startpoint: new FormControl("", [Validators.required]),
      endpoint: new FormControl("", [Validators.required])
    });
  }




  get startPoint() {
    return this.tripForm.get('startPoint');
  }

  get endPoint() {
    return this.tripForm.get('endPoint');
  }

  reset(){
    this.tripArray= [];
  }
  
  submit() {
    if (this.tripForm.invalid) {
      alert('Form is invalid kindly input details required')
    } else {
      let trip = this.tripForm.value;
      this.tripArray.push(trip.startpoint + ' - ' + trip.endpoint);

      let designDiv = document.getElementById('design');
      let circleDiv = document.getElementById('circle');
      let lineDiv = document.getElementById('line');
      // circleDiv.innerHTML = "circleDiv";
      // lineDiv.innerHTML = "lineDiv";

      if (this.tripArray[this.tripArray.length - 1] == this.tripArray[this.tripArray.length - 2]) {
        console.log('same pickup & drop')
      } else {
        console.log('Continued Trip')
        // designDiv.append(circleDiv);
        // designDiv.append(lineDiv);
      }

      for (let i = 0; i < this.tripArray.length; i++) {
        this.tripArray.forEach((elem) => {

          if (this.tripArray[i] != this.tripArray[i + 1]) {

          }
        })
      }
      console.log(this.tripForm.value);
      console.log(this.tripArray);
    }
  }

  swapsource() {
    let currentValue = this.tripForm.value
    this.tripForm.get('startpoint').patchValue(currentValue.endpoint);
    this.tripForm.get('endpoint').patchValue(currentValue.startpoint);
  }



  setStartGoogleAutoComplete(event) {
    this.autocomplete = new google.maps.places.Autocomplete(event.target, {
      types: ['(cities)'],
      componentRestrictions: { 'country': 'IN' }
    });

    this.autocomplete.addListener('place_changed', () => {
      const place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

      if (place.geometry === undefined || place.geometry === null) {
        return;
      }

      const city = place.address_components.filter(address => address.types.includes('locality'));
      const state = place.address_components.filter(address =>
        address.types.includes('administrative_area_level_1')
      );

      const strip = {
        city: city.length > 0 ? city[0]['long_name'] : '',
        state: state.length > 0 ? state[0]['long_name'] : '',
      }
      console.log(strip);
      this.tripForm.get('startpoint').patchValue(strip.city.toLocaleUpperCase().slice(0, 3));
    });
  }

  setEndGoogleAutoComplete(event) {
    // this.autocomplete = new google.maps.places.Autocomplete(event.target);
    this.autocomplete = new google.maps.places.Autocomplete(event.target, {
      types: ['(cities)'],
      componentRestrictions: { 'country': 'IN' }
    });
    this.autocomplete.addListener('place_changed', () => {
      const place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

      if (place.geometry === undefined || place.geometry === null) {
        return;
      }
      const city = place.address_components.filter(address => address.types.includes('locality'));
      const state = place.address_components.filter(address =>
        address.types.includes('administrative_area_level_1')
      );
      const ecity = {
        city: city.length > 0 ? city[0]['long_name'] : '',
        state: state.length > 0 ? state[0]['long_name'] : '',
      }
      console.log(ecity);
      this.tripForm.get('endpoint').patchValue(ecity.city.toLocaleUpperCase().slice(0, 3));

    });
  }

}

