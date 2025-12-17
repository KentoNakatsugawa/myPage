export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  company: string;
  companyPhone: string;
  licenseExpiry: string;
  insuranceExpiry: string;
  shakenExpiry: string;
}

export interface StepInfo {
  id: number;
  phase: string;
  title: string;
  description: string;
  buttonLabel: string;
}

export interface PaymentInfo {
  nextPaymentDate: string;
  amount: number;
}

export interface VehicleInfo {
  name: string;
  estimatedValue: number;
  recommendationLevel: number;
}

export type AlertType = 'license' | 'insurance' | 'shaken' | null;

export interface NorelState {
  isAuthenticated: boolean;
  currentStep: number;
  norelScore: number;
  isMenuOpen: boolean;
  userProfile: UserProfile;
  paymentInfo: PaymentInfo;
  vehicleInfo: VehicleInfo;
  alertType: AlertType;
}

export interface Receipt {
  id: string;
  date: string;
  amount: number;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
}
