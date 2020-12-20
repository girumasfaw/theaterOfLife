import { Action } from '@ngrx/store';
import { IArea } from 'src/app/models/area.interface';
import { IRole } from 'src/app/models/role.interface';
import { IUIDate } from 'src/app/models/UIDate.interface';

export enum ELifeMatrixActions {
    AddArea = '[LM] add area',
    RemoveArea = '[LM] remove area',
    AddRole = '[LM] add role',
    RemoveRole = '[LM] remove role',
    CheckAction = '[LM] check action',
    UncheckAction = '[LM] uncheck action'
}

export class AddArea implements Action {
    public readonly type = ELifeMatrixActions.AddArea;
    constructor(public payload: IArea) {}
}

export class RemoveArea implements Action {
  public readonly type = ELifeMatrixActions.RemoveArea;
  constructor(public payload: string) {}
}

export class AddRole implements Action {
  public readonly type = ELifeMatrixActions.AddRole;
  constructor(public payload: {areaId:string, role:IRole}) {}
}

export class RemoveRole implements Action {
  public readonly type = ELifeMatrixActions.RemoveRole;
  constructor(public payload: {areaId:string, roleId: string}) {}
}

export class CheckAction implements Action {
  public readonly type = ELifeMatrixActions.CheckAction;
  constructor(public payload: {areaId:string, roleId:string, completedDate: Date}) {}
}

export class UncheckAction implements Action {
  public readonly type = ELifeMatrixActions.UncheckAction;
  constructor(public payload: {areaId:string, roleId:string, completedDate: Date}) {}
}

export type LMActions = AddArea | RemoveArea | AddRole | RemoveRole | CheckAction | UncheckAction;
