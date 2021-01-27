import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { addDays, getDate, getDay, getMonth, getYear, isEqual } from 'date-fns';
import { IUIDate } from 'src/app/models/UIDate.interface';
import { getDateOfISOWeek } from 'src/app/store/selectors/lifeMatrix.selectors';
import { selectUIDate } from 'src/app/store/selectors/ui.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  @Input() title: string;
  @Input() dayIndex: number;
  month:number;
  day:number;
  isToday: boolean;
  isNotInCursorYear: boolean;


  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this._store.pipe(select(selectUIDate)).subscribe((uiDate:IUIDate)=>{
       let currentDay = addDays(getDateOfISOWeek(uiDate.cursorWeek,uiDate.cursorYear), this.dayIndex)
       this.month = getMonth(new Date(currentDay)) + 1;
       this.day = getDate(new Date(currentDay));
       this.isToday = isEqual(currentDay, uiDate.today)
       this.isNotInCursorYear = getYear(currentDay) != getYear(uiDate.today);
    })
  }

}
