import { NorelState, UserProfile, AlertType } from '@/types';

// Action Types
export type NorelAction =
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' }
  | { type: 'NEXT_STEP' }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'TOGGLE_MENU' }
  | { type: 'CLOSE_MENU' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<UserProfile> }
  | { type: 'SET_ALERT'; payload: AlertType }
  | { type: 'CLEAR_ALERT' };

// Action Creators (for type safety and logging)
export const norelActions = {
  login: (): NorelAction => ({ type: 'LOGIN' }),
  logout: (): NorelAction => ({ type: 'LOGOUT' }),
  nextStep: (): NorelAction => ({ type: 'NEXT_STEP' }),
  setStep: (step: number): NorelAction => ({ type: 'SET_STEP', payload: step }),
  toggleMenu: (): NorelAction => ({ type: 'TOGGLE_MENU' }),
  closeMenu: (): NorelAction => ({ type: 'CLOSE_MENU' }),
  updateProfile: (profile: Partial<UserProfile>): NorelAction => ({
    type: 'UPDATE_PROFILE',
    payload: profile,
  }),
  setAlert: (alert: AlertType): NorelAction => ({ type: 'SET_ALERT', payload: alert }),
  clearAlert: (): NorelAction => ({ type: 'CLEAR_ALERT' }),
};

// Reducer
export function norelReducer(state: NorelState, action: NorelAction): NorelState {
  // Debug logging (can be disabled in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('[NorelContext]', action.type, 'payload' in action ? action.payload : '');
  }

  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };

    case 'LOGOUT':
      return { ...state, isAuthenticated: false, currentStep: 1 };

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 8),
      };

    case 'SET_STEP':
      return {
        ...state,
        currentStep: Math.max(1, Math.min(action.payload, 8)),
      };

    case 'TOGGLE_MENU':
      return { ...state, isMenuOpen: !state.isMenuOpen };

    case 'CLOSE_MENU':
      return { ...state, isMenuOpen: false };

    case 'UPDATE_PROFILE':
      return {
        ...state,
        userProfile: { ...state.userProfile, ...action.payload },
      };

    case 'SET_ALERT':
      return { ...state, alertType: action.payload };

    case 'CLEAR_ALERT':
      return { ...state, alertType: null };

    default:
      return state;
  }
}
