import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  breeds:string[] = [];
  cities:string[] = [];
  constructor(private dataService:DataService,private router: Router) {}

  ngOnInit() {
  }

  changeAnimal(animal){
    this.dataService.getBreeds(animal).subscribe((breeds) => {
      this.breeds = [];
      breeds.petfinder.breeds.breed.forEach(element => {
        this.breeds.push(element["$t"]);
      });
      console.log(this.breeds);
    });

  }

  changeState(state){
    this.dataService.getCities(state).subscribe((cities) => {
        this.cities = [];
        cities.forEach(element => {
          this.cities.push(element["city"]);
        })
    })
  }

  seeBreeds(breed,state,city,size,sex,age){
    this.dataService.setBreed(breed,state,city,size,sex,age);
    this.router.navigate(['/postings']);
  }


}
