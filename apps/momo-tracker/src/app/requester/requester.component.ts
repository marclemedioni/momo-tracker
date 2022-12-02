import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'mt-requester',
  templateUrl: './requester.component.html',
  styleUrls: ['./requester.component.scss'],
})
export class RequesterComponent implements OnInit {
  searchForm!: FormGroup;
  time!: Date;
  hours!: number;
  msg!: string;

  constructor(private fb: FormBuilder) {
    setInterval(() => {
        this.time = new Date();
    }, 1000);

    this.decide();
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  getCurrentDate() {
    setInterval(() => {
    this.time = new Date();
   }, 1000);
  }

  decide() {
    this.hours = new Date().getHours();
    if(this.hours < 18) {
      this.msg = "Bonjour"
    }
    else {
      this.msg = "Bonsoir"
    }
  }
}
