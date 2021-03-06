import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers, Jsonp} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  petKey:string;
  citiesKey:string;
  selectedBreed:string;
  selectedAnimal:string;
  selectedState:string;
  selectedCity:string;
  selectedSize:string;
  selectedSex:string;
  selectedAge:string;
  constructor(public jsonp:Jsonp, public http:Http) {
    console.log("constructing");
    fetch('/keys')
    .then(res => res.json())
    .then(keys => {
      this.petKey = keys.petKey;
      this.citiesKey = keys.cityKey;
    })
  }

  getBreeds(animal){
    this.selectedAnimal = animal;
    return this.jsonp.get("https://api.petfinder.com/breed.list?key=" + this.petKey + "&animal="+ animal + "&format=json&callback=JSONP_CALLBACK")
    .map(res => res.json());
  }

  getCities(state){
    this.selectedState = state;
    let headers = new Headers();
    headers.append("X-Mashape-Key", this.citiesKey);
    headers.append("X-Mashape-Host", "andruxnet-world-cities-v1.p.mashape.com");
    let options = new RequestOptions({ headers: headers });
    return this.http.get("https://andruxnet-world-cities-v1.p.mashape.com/?searchby=state&query=" + state, options)
    .map(res => res.json());
  }

  setBreed(breed,state,city,size,sex,age){
    this.selectedBreed = breed;
    this.selectedCity = city;
    this.selectedSize = size;
    this.selectedSex = sex;
    this.selectedAge = age;
  }

  getPostings(offset){
    let params = new URLSearchParams();
    params.set("key",this.petKey);
    params.set("format","json");
    params.set("callback","JSONP_CALLBACK");
    params.set("breed",this.selectedBreed);
    params.set("size",this.selectedSize);
    params.set("sex",this.selectedSex);
    params.set("age",this.selectedAge);
    params.set("offset", offset);
    (this.selectedCity)?params.set("location",([this.selectedCity,this.selectedState].join())):params.set("location",this.selectedState);
    let options = new RequestOptions({ params: params });
    return this.jsonp.get("https://api.petfinder.com/pet.find?",options)
      .map(res => res.json());
  }
}
