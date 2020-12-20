import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getISOWeeksInYear } from 'date-fns';
import addDays from 'date-fns/addDays'
import { IUIDate } from 'src/app/models/UIDate.interface';
import { CheckAction, UncheckAction } from 'src/app/store/actions/lifeMatrix/lifeMatrix.actions';
import { getDateOfISOWeek, isActionCompleted } from 'src/app/store/selectors/lifeMatrix.selectors';
import { selectUIDate } from 'src/app/store/selectors/ui.selectors';
import { AppState } from 'src/app/store/state/app.state';
import {MatSnackBar} from '@angular/material/snack-bar';
import isAfter from 'date-fns/is_after';

@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.component.scss']
})
export class CheckerComponent implements OnInit {
  isChecked: boolean = false;
  @Input() isActionable: boolean;
  @Input() areaId:string;
  @Input() roleId:string;
  @Input() dateIndex:number;
  uiDate: IUIDate
  @Input() completedDate: Date
  constructor(private _store: Store<AppState>,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this._store.pipe(select(selectUIDate)).subscribe((uiDate:IUIDate)=>{
       this.uiDate = uiDate
       this.completedDate = addDays(getDateOfISOWeek(this.uiDate.cursorWeek,this.uiDate.cursorYear), this.dateIndex)
    })

    this._store.pipe(select(isActionCompleted, {areaId:this.areaId,roleId:this.roleId,dateIndex:this.dateIndex})).subscribe((isChecked:boolean)=>{
      this.isChecked = isChecked
    })
  }

  toggleChecker(){
     if(isAfter(this.completedDate,this.uiDate.today)){
        this.openSnackBar("It's not possible to complete a task from the future!", "Cancel")
        return;
     }
     if(this.isChecked){
      this._store.dispatch(new UncheckAction({areaId:this.areaId,roleId:this.roleId, completedDate:this.completedDate}))
     }else{
      this._store.dispatch(new CheckAction({areaId:this.areaId,roleId:this.roleId, completedDate:this.completedDate}))
     }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
