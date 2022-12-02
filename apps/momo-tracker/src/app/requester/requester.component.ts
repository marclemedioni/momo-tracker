import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'mt-requester',
  templateUrl: './requester.component.html',
  styleUrls: ['./requester.component.scss'],
})
export class RequesterComponent implements OnInit {
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }
}
