import { createSelector } from '@ngrx/store';
import { IArea } from 'src/app/models/area.interface';
import { IUIDate } from 'src/app/models/UIDate.interface';
import { AppState } from '../state/app.state';
import { selectUIDate } from './ui.selectors';
import isWithinRange from 'date-fns/is_within_range';
import { getISOWeek , getYear} from 'date-fns';
import { IRole } from 'src/app/models/role.interface';
import isEqual from 'date-fns/isEqual';
import addDays from 'date-fns/addDays';

const areas = (state: AppState) => state.lifeMatrixState.areas;

export const selectAreas = createSelector(
    areas,
   (state: IArea[]) => {
      return state
   }
);

export const selectAreasInScope = createSelector(
  areas,
  selectUIDate,
  (areas: IArea[], uiDate: IUIDate) => {
    return areas.filter((a) =>
      isWithinRange(
        getDateOfISOWeek(uiDate.cursorWeek, uiDate.cursorYear),
        getDateOfISOWeek(
          getISOWeek(new Date(a.metadata.period.start)),
          getYear(a.metadata.period.start)
        ),
        getDateOfISOWeek(
          getISOWeek(new Date(a.metadata.period.end)),
          getYear(a.metadata.period.end)
        )
      )
    );
  }
);



export const selectRolesInScope = createSelector(
  areas,
  selectUIDate,
  (areas: IArea[], uiDate: IUIDate, areaId: string) => {
    return areas.filter((a)=> a.metadata.id == areaId)[0].roles.filter((r:IRole)=>
       isWithinRange(
        getDateOfISOWeek(uiDate.cursorWeek, uiDate.cursorYear),
        getDateOfISOWeek(
          getISOWeek(new Date(r.metadata.period.start)),
          getYear(new Date(r.metadata.period.start))
        ),
        getDateOfISOWeek(
          getISOWeek(new Date(r.metadata.period.end)),
          getYear(new Date(r.metadata.period.end))
        )
      )
    )
  }
)

export const isActionCompleted = createSelector(
  areas,
  selectUIDate,
  (areas: IArea[], uiDate: IUIDate, args: {areaId: string, roleId:string, dateIndex: number})=>{
    let completedDate = addDays(getDateOfISOWeek(uiDate.cursorWeek,uiDate.cursorYear), args.dateIndex)
    return areas.filter((a)=>  a.metadata.id == args.areaId)[0].roles.filter((r)=> r.metadata.id == args.roleId)[0].completedDates.some((d)=> isEqual(d,completedDate))
  }
)

export const  getDateOfISOWeek = (w, y)=> {
  var simple = new Date(y, 0, 1 + (w - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  if (dow <= 4)
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}

