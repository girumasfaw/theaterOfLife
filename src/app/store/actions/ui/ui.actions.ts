import { Action } from '@ngrx/store';
import { IUIDate } from 'src/app/models/UIDate.interface';

export enum EUIActions {
    SetLoading = '[UI] Set Loading',
    SetUIDate = '[UI] set UI date',
    IncrementWeek = '[UI] Increment week',
    DecrementWeek = '[UI] Decrement week',
    SetWeek = '[UI] Set Week',
    IncrementYear = '[UI] Increment Year',
    DecrementYear = '[UI] Decrement Year',
    SetYear = '[UI] Set Year'
}

export class SetLoading implements Action {
    public readonly type = EUIActions.SetLoading;
    constructor(public payload: boolean) {}
}

export class SetUIDate implements Action {
  public readonly type = EUIActions.SetUIDate;
  constructor(public payload: IUIDate) {}
}

export class IncrementWeek implements Action{
  public readonly type = EUIActions.IncrementWeek;
  constructor() {}
}

export class DecrementWeek implements Action{
  public readonly type = EUIActions.DecrementWeek;
  constructor() {}
}

export class SetWeek implements Action{
  public readonly type = EUIActions.SetWeek;
  constructor(public payload: number) {}
}

export class IncrementYear implements Action{
  public readonly type = EUIActions.IncrementYear;
  constructor() {}
}

export class DecrementYear implements Action{
  public readonly type = EUIActions.DecrementYear;
  constructor() {}
}

export class SetYear implements Action{
  public readonly type = EUIActions.SetYear;
  constructor(public payload: number) {}
}

export type UIActions = SetLoading | SetUIDate | IncrementWeek | DecrementWeek | SetWeek | IncrementYear | DecrementYear | SetYear ;
