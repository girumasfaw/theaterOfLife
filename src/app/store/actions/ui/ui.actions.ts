import { Action } from '@ngrx/store';
import { IUIDate } from 'src/app/models/UIDate.interface';

export enum EUIActions {
    SetLoading = '[UI] Set Loading',
    SetUIDate = '[UI] set UI date',
    IncrementWeek = '[UI] Increment week',
    DecrementWeek = '[UI] Decrement week'
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

export type UIActions = SetLoading | SetUIDate | IncrementWeek | DecrementWeek;
