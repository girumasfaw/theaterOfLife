import { createSelector } from '@ngrx/store';
import { IUIDate } from 'src/app/models/UIDate.interface';
import { SetUIDate } from '../actions/ui/ui.actions';
import { AppState } from '../state/app.state';

const areas = (state: AppState) => state.uiState.uiDate;

export const selectUIDate = createSelector(
    areas,
   (state: IUIDate ) => {
      return state
   }
);
