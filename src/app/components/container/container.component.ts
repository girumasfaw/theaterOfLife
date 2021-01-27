import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IArea } from 'src/app/models/area.interface';
import { selectAreas, selectAreasInScope } from 'src/app/store/selectors/lifeMatrix.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { AddAreaDialogComponent } from '../add-area-dialog/add-area-dialog.component';
import {getISOWeeksInYear, getWeek, getYear, getISOWeek} from 'date-fns'
import { DecrementWeek, IncrementWeek, SetUIDate , IncrementYear, SetWeek, DecrementYear} from 'src/app/store/actions/ui/ui.actions';
import { IUIDate } from 'src/app/models/UIDate.interface';
import { selectUIDate } from 'src/app/store/selectors/ui.selectors';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  date = new FormControl();
  areas$: Observable<IArea[]>;
  scopedAreas$: Observable<IArea[]>;
  uiDate$: Observable<IUIDate>;
  isFirstWeek: boolean;
  isLastWeek: boolean;
  totalWeekInYear: number;
  defaultDaysTxt = ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  days = this.defaultDaysTxt;
  _cursorYear: number;




  constructor(private _store: Store<AppState>,private dialog: MatDialog,private observer: BreakpointObserver) {}

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddAreaDialogComponent, dialogConfig);

  }

  ngOnInit() {
    let today = new Date()
    today.setHours(0,0,0,0)
    this._store.dispatch(new SetUIDate({cursorWeek:getISOWeek(new Date()),cursorYear:getYear(new Date()), today: today}));
    this.areas$ = this._store.pipe(select(selectAreas));
    this.scopedAreas$ = this._store.pipe(select(selectAreasInScope));
    this.uiDate$ = this._store.pipe(select(selectUIDate));
    this.uiDate$.subscribe((uiDate)=>{
      this.totalWeekInYear = getISOWeeksInYear(new Date(uiDate.cursorYear,1,1));
      this._cursorYear = uiDate.cursorYear
      this.isFirstWeek = uiDate.cursorWeek == 1;
      this.isLastWeek = uiDate.cursorWeek ==  this.totalWeekInYear;
    });

     this.observer.observe('(max-width: 950px)').subscribe(result => {
         console.log('The mobile version is not available yet!',result)
         if(result.matches){
             this.days = ['M','T','W','T','F','S','S']
         }else{
            this.days = this.defaultDaysTxt;
         }

     });


  }

  incrementWeek(){
    if(this.isLastWeek){
      this._store.dispatch(new IncrementYear())
      this._store.dispatch(new SetWeek(1))
    }else{
      this._store.dispatch(new IncrementWeek());
    }
  }

  decrementWeek(){
    if(this.isFirstWeek){
      this._store.dispatch(new DecrementYear())
      this._store.dispatch(new SetWeek(this.totalWeekInYear))
    }else{
      this._store.dispatch(new DecrementWeek());
    }
  }

  incrementYear(){
     this._store.dispatch(new IncrementYear())
  }
  decrementYear(){
    this._store.dispatch(new DecrementYear())
  }



  areaTracker(index: number, areaItem: IArea) {
    return  JSON.stringify({id: areaItem.metadata.id, roles: areaItem.roles})
  }

}
