import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { v4 as uuidv4 } from 'uuid';
import { IArea } from 'src/app/models/area.interface';
import { AddArea } from 'src/app/store/actions/lifeMatrix/lifeMatrix.actions';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-area-dialog',
  templateUrl: './add-area-dialog.component.html',
  styleUrls: ['./add-area-dialog.component.scss']
})
export class AddAreaDialogComponent {
  areaTitle = '';
  dateRangeForm: FormGroup;

  constructor(private _store: Store<AppState>, public dialogRef: MatDialogRef<AddAreaDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,) {}

  ngOnInit(): void {
    this.dateRangeForm = this.formBuilder.group({
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required)
    });
  }

  onConfirm(): void {
    this.dialogRef.close(true);
    let newArea:IArea = {
      metadata:{
        id: uuidv4(),
        title: this.areaTitle,
        period: {
          start: this.dateRangeForm.value.start,
          end: this.dateRangeForm.value.end
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
