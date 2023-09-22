interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Freelancer'],
  tenantRoles: ['Owner', 'Recruiter'],
  tenantName: 'Company',
  applicationName: 'Free',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Manage their freelancer profile',
    'Apply for jobs',
    'Update their application status',
    'View job details',
  ],
  ownerAbilities: [
    'Manage freelancer profiles',
    'Manage users',
    'Manage companies',
    'Manage jobs',
    'Manage applications',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/fef76b3a-0da2-4c60-a11b-ce3a2a0d02a6',
};
