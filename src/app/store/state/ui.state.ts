import { IUIDate } from 'src/app/models/UIDate.interface';

export interface UIState {
  uiDate: IUIDate;
  showLoader: boolean;
}

export const initialUIState: UIState = {
  uiDate:{
    cursorWeek: 1,
    cursorYear: 2020,
    today: new Date()
  },
  showLoader: false,
};
