import { Component, Inject, Injectable, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRole } from 'src/app/models/role.interface';
import { v4 as uuidv4 } from 'uuid';
import { AddRole } from 'src/app/store/actions/lifeMatrix/lifeMatrix.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';


@Component({
  selector: 'app-create-action-dialog',
  templateUrl: './create-action-dialog.component.html',
  styleUrls: ['./create-action-dialog.component.scss'],
})
export class CreateActionDialogComponent implements OnInit {
  role = '';
  action = '';
  daysOftheWeek = [
    { val: 0, label: 'Mon' },
    { val: 1, label: 'Tue' },
    { val: 2, label: 'Wed' },
    { val: 3, label: 'Thu' },
    { val: 4, label: 'Fri' },
    { val: 5, label: 'Sat' },
    { val: 6, label: 'Sun' },
  ];
  selectedDays = [0, 1, 2, 3, 4, 5, 6];
  selectedColor = '8777D9';
  colors = ['8777D9','2684FF', '57D9A3', '00C7E6', 'FFC400', 'FF7452', '6B778C'];
  selectedPersona = 'face'
  personas = ['face','social_distance','rowing','self_improvement','hot_tub','call', 'live_tv','speaker', 'menu_book', 'no_cell']

  dateRangeForm: FormGroup;

  constructor(
    private _store: Store<AppState>,
    public dialogRef: MatDialogRef<CreateActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.dateRangeForm = this.formBuilder.group({
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required)
    });
  }

  onConfirm(): void {

    this.dialogRef.close(true);
    let newRole: IRole = {
      action: this.action,
      frequency: this.selectedDays,
      labelColor: this.selectedColor,
      personaIcon: this.selectedPersona,
      metadata:{
        id: uuidv4(),
        title: this.role,
        period:{
          start: this.dateRangeForm.value.start,
          end: this.dateRangeForm.value.end
        }
      },
      completedDates:[]
    }
    this._store.dispatch(new AddRole({areaId: this.data, role:newRole}))
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  isDaySelected(val:number): boolean{
     return this.selectedDays.includes(val)
  }

  toggleSelection(val:number){
     if(this.isDaySelected(val)){
       this.selectedDays = this.selectedDays.filter(d => val != d)
     }else{
       this.selectedDays.push(val)
     }
  }

  selectColor(val:string){
    this.selectedColor = val;
  }
  selectPersona(val:string){
    this.selectedPersona = val;
  }
}
