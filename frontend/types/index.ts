export type HousingRentalRecord = {
  id: number;
  tenantName: string;
  propertyAddress: string;
  leaseStartDate: string;
  leaseEndDate: string;
  rentAmount: number;
  verificationStatus: string;
  submittedAt: string;
  verifiedAt: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type Consent = {
  id: number;
  agencyFrom: string;
  agencyTo: string;
  granted: boolean;
};

export type RetailTransaction = {
  id: number;
  customerName: string;
  product: string;
  amount: number;
  transactionDate: string;
  verificationStatus: string;
  submittedAt: string;
  verifiedAt: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type InsuranceRecord = {
  id: number;
  policyHolderName: string;
  policyNumber: string;
  policyType: string;
  coverageAmount: number;
  verificationStatus: string;
  submittedAt: string;
  verifiedAt: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};
