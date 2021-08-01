import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public date!: Observable<string>;

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  public ngOnInit() {
    this.date = this.dataService.date
      .pipe(map(date => `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`))
  }

  public previous() {
    this.adjustDate(-1);
  }

  public next() {
    this.adjustDate(1);
  }

  public today() {
    this.dataService.setDateToday
  }

  public isToday(): Boolean {
    return this.dataService.isToday();
  }

  public pageSelected($event: MatSelectChange): void {
    this.router.navigate([$event.value]);
  }

  private adjustDate(days: number) {
    const date = this.dataService.getDate();
    date.setDate(date.getDate() + days);
    date.setHours(23);
    date.setMinutes(59);

    this.dataService.setDate(date);
  }
}
