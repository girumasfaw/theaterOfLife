import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { LifeMatrixReducer } from './LM/lifeMatrix.reducer';
import { UIReducer } from './ui/ui.reducer';

export const appReducers: ActionReducerMap<AppState, any> = {
   lifeMatrixState: LifeMatrixReducer,
   uiState: UIReducer
};
