import { Component } from '@angular/core';
import "@angular/compiler";
import { FormControl, Validators } from '@angular/forms';
import { ContactDetails } from "./contactDetails";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contact-list';
  loading: boolean = true;
  list: ContactDetails[] = [];
  details: ContactDetails = { firstName: "", lastName: "", contactType: "Phone", number: 0, isfavorite: false };
  detailsFound: boolean = false;
  create: boolean = false;
  edit: boolean = false;
  number: number = 0;

  ngOnInit() {
    this.loading = false;
    this.list = [
      { firstName: "John", lastName: "Smith", contactType: "Mobile", number: 1234567890, isfavorite: false },
      { firstName: "Robert", lastName: "Charlie", contactType: "Phone", number: 9876543210, isfavorite: false },
      { firstName: "Heli", lastName: "Doe", contactType: "Landline", number: 7654321, isfavorite: false }
    ];
  }

  numberFormControl = new FormControl('', [
    Validators.required,
    Validators.min(100000),
    Validators.max(9999999999),
  ]);

  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(16),
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(16),
  ]);

  selected = new FormControl('', [
    Validators.required
  ]);

  searchContact() {
    this.detailsFound = false;
    if(this.numberFormControl.value !== 0 && this.numberFormControl.value >= 100000 && this.numberFormControl.value <= 9999999999) {
      for(var i = 0 ; i < this.list.length; i++) {
        if(this.list[i].number == this.numberFormControl.value) {
          this.details = this.list[i];
          this.detailsFound = true;
          // this.numberFormControl.setValue("");
          break;
        }
      }
    }
  }

  searchNumber(num: number) {
    this.detailsFound = false;
    for(var i = 0 ; i < this.list.length; i++) {
      if(this.list[i].number == num) {
        this.details = this.list[i];
        this.detailsFound = true;
        // this.numberFormControl.setValue("");
        break;
      }
    }
  }

  createContact() {
    this.create = true;
    this.edit = false;
  }

  cancelContact() {
    this.create = false;
  }

  addContact() {
    let bool: Boolean = true;
    if(this.numberFormControl.value !== 0 && this.numberFormControl.value >= 100000 && this.numberFormControl.value <= 9999999999 && this.firstNameFormControl.value !== "" && this.firstNameFormControl.value.length >= 3 && this.firstNameFormControl.value.length <= 16 && this.lastNameFormControl.value !== "" && this.lastNameFormControl.value.length >= 3 && this.lastNameFormControl.value.length <= 16 && this.selected.value !== "") {
      for(var i = 0 ; i < this.list.length; i++) {
        if(this.list[i].number == this.numberFormControl.value) {
          bool = false;
          break;
        }
      }
      if(bool) {
        const newContact: ContactDetails = {
          firstName: this.firstNameFormControl.value,
          lastName: this.lastNameFormControl.value,
          contactType: this.selected.value,
          number: this.numberFormControl.value,
          isfavorite: false
        };
        this.list.push(newContact);
      }
      else {
        alert("Contact Number already Exists!");
      }
    }
  }

  addFavorite(num: number) {
    for(var i = 0 ; i < this.list.length; i++) {
      if(this.list[i].number == num) {
        this.list[i].isfavorite = true;
        break;
      }
    }
  }

  deleteFavorite(num: number) {
    for(var i = 0 ; i < this.list.length; i++) {
      if(this.list[i].number == num) {
        this.list[i].isfavorite = false;
        break;
      }
    }
  }

  editContact(num: number) {
    this.create = true;
    for(var i = 0 ; i < this.list.length; i++) {
      if(this.list[i].number == num) {
        this.details = this.list[i];
        break;
      }
    }
    this.numberFormControl.setValue(this.details.number);
    this.firstNameFormControl.setValue(this.details.firstName);
    this.lastNameFormControl.setValue(this.details.lastName);
    this.selected.setValue(this.details.contactType);
    this.edit = true;
    this.number = num;
  }

  updateContact() {
    let bool: Boolean = true;
    if(this.numberFormControl.value !== 0 && this.numberFormControl.value >= 100000 && this.numberFormControl.value <= 9999999999 && this.firstNameFormControl.value !== "" && this.firstNameFormControl.value.length >= 3 && this.firstNameFormControl.value.length <= 16 && this.lastNameFormControl.value !== "" && this.lastNameFormControl.value.length >= 3 && this.lastNameFormControl.value.length <= 16 && this.selected.value !== "") {
      for(var i = 0 ; i < this.list.length; i++) {
        if(this.list[i].number == this.numberFormControl.value) {
          bool = false;
          this.list[i].firstName = this.firstNameFormControl.value;
          this.list[i].lastName = this.lastNameFormControl.value;
          this.list[i].contactType = this.selected.value;
          break;
        }
      }
      if(bool) {
        this.list = this.list.filter(item => item.number !== this.number);
        const newContact: ContactDetails = {
          firstName: this.firstNameFormControl.value,
          lastName: this.lastNameFormControl.value,
          contactType: this.selected.value,
          number: this.numberFormControl.value,
          isfavorite: false
        };
        this.list.push(newContact);
      }
      else {
        
      }
    }
    this.edit = false;
    this.create = false;
  }

  cancelUpdate() {
    this.edit = false;
    this.create = false;
  }

  deleteContact(num: number) {
    this.list = this.list.filter(item => item.number !== num);
  }
}
