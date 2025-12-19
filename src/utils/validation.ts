export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Zip code validation (XXX-XXXX format)
export function validateZipCode(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, error: '郵便番号を入力してください' };
  }
  const zipCodeRegex = /^\d{3}-?\d{4}$/;
  if (!zipCodeRegex.test(value)) {
    return { isValid: false, error: '正しい形式で入力してください（例: 150-0041）' };
  }
  return { isValid: true };
}

// Phone number validation (XXX-XXXX-XXXX format)
export function validatePhone(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, error: '電話番号を入力してください' };
  }
  // Allow various phone formats: 090-1234-5678, 03-1234-5678, etc.
  const phoneRegex = /^0\d{1,4}-?\d{1,4}-?\d{3,4}$/;
  if (!phoneRegex.test(value.replace(/-/g, ''))) {
    return { isValid: false, error: '正しい形式で入力してください（例: 090-1234-5678）' };
  }
  return { isValid: true };
}

// Address validation
export function validateAddress(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, error: '住所を入力してください' };
  }
  if (value.length < 5) {
    return { isValid: false, error: '住所をより詳しく入力してください' };
  }
  return { isValid: true };
}

// Company name validation
export function validateCompanyName(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, error: '会社名を入力してください' };
  }
  return { isValid: true };
}

// Generic required field validation
export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, error: `${fieldName}を入力してください` };
  }
  return { isValid: true };
}

// Validate all profile form fields
export interface ProfileValidationErrors {
  zipCode?: string;
  address?: string;
  phone?: string;
  company?: string;
  companyPhone?: string;
}

export function validateProfileForm(
  type: 'address' | 'phone' | 'company',
  data: {
    zipCode?: string;
    address?: string;
    phone?: string;
    company?: string;
    companyPhone?: string;
  }
): { isValid: boolean; errors: ProfileValidationErrors } {
  const errors: ProfileValidationErrors = {};

  if (type === 'address') {
    const zipResult = validateZipCode(data.zipCode || '');
    if (!zipResult.isValid) errors.zipCode = zipResult.error;

    const addressResult = validateAddress(data.address || '');
    if (!addressResult.isValid) errors.address = addressResult.error;
  }

  if (type === 'phone') {
    const phoneResult = validatePhone(data.phone || '');
    if (!phoneResult.isValid) errors.phone = phoneResult.error;
  }

  if (type === 'company') {
    const companyResult = validateCompanyName(data.company || '');
    if (!companyResult.isValid) errors.company = companyResult.error;

    const phoneResult = validatePhone(data.companyPhone || '');
    if (!phoneResult.isValid) errors.companyPhone = phoneResult.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
