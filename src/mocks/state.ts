import { NorelState, PaymentInfo, VehicleInfo } from '@/types';
import { defaultUserProfile } from './user';

export const defaultPaymentInfo: PaymentInfo = {
  nextPaymentDate: '1月5日',
  amount: 39800,
};

export const defaultVehicleInfo: VehicleInfo = {
  name: 'BMW 320d Mスポーツ',
  estimatedValue: 1450000,
  recommendationLevel: 5,
};

export const defaultNorelState: NorelState = {
  isAuthenticated: false,
  currentStep: 1,
  norelScore: 750,
  isMenuOpen: false,
  userProfile: defaultUserProfile,
  paymentInfo: defaultPaymentInfo,
  vehicleInfo: defaultVehicleInfo,
  alertType: null,
};
