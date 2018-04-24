import {Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-postings',
  templateUrl: './postings.component.html',
  styleUrls: ['./postings.component.scss']

})
export class PostingsComponent implements OnInit {
  postings:Posting[] = [];
  carouselPics:string[] = [];
  selectedPost:Posting = null;
  offset:number = 0;
  directionOffset:number;
  count:number = 25;

  constructor(private dataService:DataService, private modalService: NgbModal, private router:Router) { }

  ngOnInit() {
    this.dataService.getPostings(this.offset).subscribe((pets) => {
      this.offset = pets.petfinder.lastOffset["$t"];
      pets.petfinder.pets.pet.forEach((element) => {
        this.buildPosting(element);
      });
     });
  }

  //direction boolean:
  //true = next page
  //false = last page
  changePage(direction){
      this.postings = [];
      //determine page offset
      direction? this.directionOffset = this.offset
      : this.directionOffset = this.offset - (this.count * 2);

      this.dataService.getPostings(this.directionOffset).subscribe((pets) => {
        this.offset = pets.petfinder.lastOffset["$t"];
        pets.petfinder.pets.pet.forEach((element) => {
          this.buildPosting(element);
        });
      })
    }


  buildPosting(element){
    let breedString:string="";
    if(Array.isArray(element.breeds.breed)){

        element.breeds.breed.forEach(breed => {
        breedString += breed["$t"] + ", ";
        })
        breedString = breedString.substring(0,breedString.length-2);

    }else{
        breedString = element.breeds.breed["$t"];
    }

    let contact:Address = {
      street:element.contact.address2["$t"] + element.contact.address1["$t"],
      city:element.contact.city["$t"],
      state: element.contact.state["$t"],
      zip: element.contact.zip["$t"]
    }

    let newPost:Posting = {
      id: element.id["$t"],
      name: element.name["$t"],
      age: element.age["$t"],
      breed: breedString,
      sex: element.sex["$t"],
      state: element.contact.state["$t"],
      city: element.contact.city["$t"],
      status: element.status["$t"],
      thumbnail: (element.media.photos)?element.media.photos.photo[2].$t:null,
      pics: (element.media.photos)?element.media.photos.photo:null,
      description: element.description["$t"],
      contact: contact
    }

    this.postings.push(newPost);
  }

  open(modal,i) {
      this.selectedPost = this.postings[i];
      this.carouselPics = this.selectedPost.pics.filter(pic => pic["@size"] === "x");
      this.modalService.open(modal, {
         size: 'lg', backdrop: 'static',windowClass:'custom-modal animated slideInUp'
      });
  }

  back(){
    this.router.navigate(['']);
  }

}

interface Posting{
  id:number,
  name:string,
  age:string,
  breed:string,
  sex:string,
  state:string,
  city:string,
  status:string,
  thumbnail:string,
  pics:string[],
  description:string,
  contact:Address

}

interface Address{
  street:string,
  city:string,
  state:string,
  zip:number
}
