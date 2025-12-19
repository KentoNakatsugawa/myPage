export {
  validateZipCode,
  validatePhone,
  validateAddress,
  validateCompanyName,
  validateRequired,
  validateProfileForm,
  type ValidationResult,
  type ProfileValidationErrors,
} from './validation';

export {
  generateReceiptHTML,
  generateInvoiceHTML,
  companyInfo,
  type ReceiptData,
  type InvoiceData,
} from './documentTemplates';
