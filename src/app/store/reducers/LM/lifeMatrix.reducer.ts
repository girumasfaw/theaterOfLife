import { IArea } from 'src/app/models/area.interface';
import { IRole } from 'src/app/models/role.interface';
import { ELifeMatrixActions, LMActions } from '../../actions/lifeMatrix/lifeMatrix.actions';
import { initialLifeMatrixState, lifeMatrixState } from '../../state/lifeMatrix.state';
import { cloneDeep } from 'lodash';
import isEqual from 'date-fns/isEqual';

export const LifeMatrixReducer = (
  state = initialLifeMatrixState,
  action: LMActions
): lifeMatrixState => {
  switch (action.type) {
    case ELifeMatrixActions.AddArea: {
      return {
        ...state,
        areas:[...state.areas, action.payload]
      };
    }
    case ELifeMatrixActions.RemoveArea: {
      return {
        ...state,
        areas: state.areas.filter((a)=> a.metadata.id != action.payload)
      };
    }
    case ELifeMatrixActions.AddRole: {
      return {
        ...state,
        areas: addRole(state,action)
      };
    }
    case ELifeMatrixActions.RemoveRole: {
      return {
        ...state,
        areas: removeRole(state,action)
      };
    }

    case ELifeMatrixActions.CheckAction:{
      return{
        ...state,
        areas: checkUncheckAction(state,action)
      }
    }
    case ELifeMatrixActions.UncheckAction:{
      return{
        ...state,
        areas: checkUncheckAction(state,action,false)
      }
    }

    default:
      return state;
  }
};


const addRole = (state: lifeMatrixState, action)=>{
    const areasCopy: IArea[] = cloneDeep(state.areas)
    return areasCopy.map((area)=>{
      if(area.metadata.id === action.payload.areaId){
        area.roles.push(action.payload.role)
      }
      return area
    })
}

const removeRole = (state: lifeMatrixState, action)=>{
  const areasCopy: IArea[] = cloneDeep(state.areas)
  return areasCopy.map((area)=>{
    if(area.metadata.id === action.payload.areaId){
       area.roles = area.roles.filter((r)=> r.metadata.id != action.payload.roleId)
    }
    return area
  })
}

const checkUncheckAction = (state: lifeMatrixState, action, check= true)=>{
  const areasCopy: IArea[] = cloneDeep(state.areas)
  return areasCopy.map((area)=>{
    if(area.metadata.id === action.payload.areaId){
       area.roles.map((r)=>{
        if(r.metadata.id === action.payload.roleId){
          if(check){
            r.completedDates.push(action.payload.completedDate)
          }else{
            r.completedDates = r.completedDates.filter((d)=>  !isEqual(d,action.payload.completedDate))
          }
        }
      })
   }
   return area
  })
}
