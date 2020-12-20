import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IRole } from 'src/app/models/role.interface';
import { IUIDate } from 'src/app/models/UIDate.interface';
import { selectUIDate } from 'src/app/store/selectors/ui.selectors';
import { AppState } from 'src/app/store/state/app.state';


@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  @Input() roleData:IRole;
  @Input() areaId:string;
  daysOftheWeek = [0, 1, 2, 3, 4, 5, 6];
  completedDate: Date
  uiDate:IUIDate
  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this._store.pipe(select(selectUIDate)).subscribe((uiDate:IUIDate)=>{
      this.uiDate = uiDate
   })
  }



  checkActionable(dayIndex:number){
    return this.roleData.frequency.includes(dayIndex)
  }


}
