
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
    case EUIActions.SetWeek:{
      return{
        ...state,
        uiDate: {
          ...state.uiDate,
          cursorWeek: action.payload,
        }
      }
    }

    case EUIActions.IncrementYear:{
      return{
        ...state,
        uiDate: {
          ...state.uiDate,
          cursorYear: state.uiDate.cursorYear + 1,
        }
      }
    }
    case EUIActions.DecrementYear:{
      return{
        ...state,
        uiDate: {
          ...state.uiDate,
          cursorYear: state.uiDate.cursorYear - 1,
        }
      }
    }

    case EUIActions.SetYear:{
      return{
        ...state,
        uiDate: {
          ...state.uiDate,
          cursorYear: action.payload,
        }
      }
    }
    default:
      return state;
  }
};
