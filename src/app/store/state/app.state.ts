import { ILifeMatrix } from 'src/app/models/lifeMatrix.interface';
import { initialLifeMatrixState, lifeMatrixState } from './lifeMatrix.state';
import { initialUIState, UIState } from './ui.state';

export interface AppState{
  lifeMatrixState: lifeMatrixState;
  uiState: UIState;

}
export const initialAppState: AppState = {
  lifeMatrixState: initialLifeMatrixState,
  uiState: initialUIState
};

export function getInitialState(): AppState {
  return initialAppState;
}
