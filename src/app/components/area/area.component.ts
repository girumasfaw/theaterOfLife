import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { getISOWeek, getYear,  } from 'date-fns';
import { Observable } from 'rxjs';
import { IArea } from 'src/app/models/area.interface';
import { IRole } from 'src/app/models/role.interface';
import { IUIDate } from 'src/app/models/UIDate.interface';
import { getDateOfISOWeek, selectRolesInScope } from 'src/app/store/selectors/lifeMatrix.selectors';
import { selectUIDate } from 'src/app/store/selectors/ui.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { CreateActionDialogComponent } from '../create-action-dialog/create-action-dialog.component';
import isWithinRange from 'date-fns/is_within_range';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  @Input() areaData: IArea;
  rolesInScope$: Observable<IRole[]>;
  isColappsed: boolean = false;

  constructor(private _store: Store<AppState>,private dialog: MatDialog) { }

  ngOnInit() {
    this.rolesInScope$ = this._store.pipe(select(selectRolesInScope, this.areaData.metadata.id))
  }

  toggleCollapse(){
    this.isColappsed = !this.isColappsed;
  }

  openDialog(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.areaData.metadata.id;
    const dialogRef = this.dialog.open(CreateActionDialogComponent, dialogConfig);
  }

  roleTracker(index: number, roleItem: IRole) {
    return roleItem.metadata.id;
  }

}
