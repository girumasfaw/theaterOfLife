import { IArea } from 'src/app/models/area.interface';

export interface lifeMatrixState {
  areas: IArea[];
}

export const initialLifeMatrixState: lifeMatrixState = {
  areas: []
};
