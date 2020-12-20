
import { EUIActions, UIActions } from '../../actions/ui/ui.actions';
import { initialUIState, UIState } from '../../state/ui.state';

export const UIReducer = (
  state = initialUIState,
  action: UIActions
): UIState => {
  switch (action.type) {
    case EUIActions.SetLoading: {
      return {
        ...state,
        showLoader: action.payload
      };
    }
    case EUIActions.SetUIDate: {
      return {
        ...state,
        uiDate: action.payload
      };
    }
    case EUIActions.IncrementWeek:{
      return{
        ...state,
        uiDate: {
          ...state.uiDate,
          cursorWeek: state.uiDate.cursorWeek + 1,
        }
      }
    }
    case EUIActions.DecrementWeek:{
      return{
        ...state,
        uiDate: {
          ...state.uiDate,
          cursorWeek: state.uiDate.cursorWeek - 1,
        }
      }
    }
    default:
      return state;
  }
};
