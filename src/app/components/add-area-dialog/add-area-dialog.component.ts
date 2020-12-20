import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormControl} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { v4 as uuidv4 } from 'uuid';
import { IArea } from 'src/app/models/area.interface';
import { AddArea } from 'src/app/store/actions/lifeMatrix/lifeMatrix.actions';

@Component({
  selector: 'app-add-area-dialog',
  templateUrl: './add-area-dialog.component.html',
  styleUrls: ['./add-area-dialog.component.scss']
})
export class AddAreaDialogComponent {
  areaTitle = '';
  range = new FormGroup({
    start: new FormControl(''),
    end: new FormControl('')
  });
  constructor(private _store: Store<AppState>, public dialogRef: MatDialogRef<AddAreaDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onConfirm(): void {
    this.dialogRef.close(true);
    let newArea:IArea = {
      metadata:{
        id: uuidv4(),
        title: this.areaTitle,
        period: {
          start: this.range.value.start,
          end: this.range.value.end
        }
      },
      roles:[]
    }
    this._store.dispatch(new AddArea(newArea))
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

}
