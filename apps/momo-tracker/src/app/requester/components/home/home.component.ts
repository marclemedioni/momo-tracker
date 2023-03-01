import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Parcel } from '@momo-tracker/models';
import { liveQuery } from 'dexie';
import { map, Observable, of, startWith, switchMap } from 'rxjs';
import { ParcelService } from '../../../core/services/parcel.service';

@Component({
  selector: 'mt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup;
  parcels$!: Observable<Parcel[] | null> | undefined;
  time = new Date();
  hours!: number;
  msg!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ParcelService: ParcelService
  ) {
    setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.decide();
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ['yve'],
    });

    this.parcels$ = this.searchForm.get('search')?.valueChanges.pipe(
      startWith('yve'),
      switchMap((searchTerms) => {
        if (!searchTerms) {
          return of(null);
        }
        return liveQuery(() => this.ParcelService.search(searchTerms));
      })
    );
  }

  getCurrentDate() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  decide() {
    this.hours = new Date().getHours();
    if (this.hours < 18) {
      this.msg = 'Bonjour';
    } else {
      this.msg = 'Bonsoir';
    }
  }

  search() {
    if (this.searchForm.value.search) {
      this.router.navigate(['search', this.searchForm.value.search]);
    }
  }

  displayFn(parcel: Parcel): string {
    return (parcel && parcel.recipient.lastName) || '';
  }

  _allowSelection(option: Parcel): { [className: string]: boolean } {
    return {
      'no-data': option.id === 0,
    };
  }
}
