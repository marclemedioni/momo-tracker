import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Parcel } from '@momo-tracker/models';
import { Observable, liveQuery } from 'dexie';
import { ParcelService } from '../../../core/services/parcel.service';

@Component({
  selector: 'mt-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchTerms = this.route.snapshot.paramMap.get('searchTerms');
  parcels$!: Observable<Parcel[]>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ParcelService: ParcelService
  ) {}

  ngOnInit() {
    if (!this.searchTerms) {
      this.router.navigate(['home']);
    }
    this.parcels$ = liveQuery(() =>
      this.ParcelService.search(this.searchTerms as string)
    );
  }

  identify(_id: number, parcel: Parcel) {
    return parcel.id;
  }
}
