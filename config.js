const CONFIG = {
  WEBHOOK_CONFIRMATION_URL: 'https://hook.us1.make.com/YOUR-WEBHOOK-ID',
  WEBHOOK_FASTSPRING_URL: 'https://hook.us1.make.com/YOUR-WEBHOOK-ID',
  WEBHOOK_ACCOUNTS_URL: 'https://hook.us1.make.com/YOUR-WEBHOOK-ID',
  REQUEST_TIMEOUT_MS: 10000,
  MAX_LOG_ENTRIES: 100,
  VERSION: '1.0.0',

  /** Sent to webhook as `reason` (always EN). UI uses i18n `fs-reason-*` per language. */
  FASTSPRING_REASON_EN: {
    whitelist: 'Whitelist Request',
    email_change: 'Update Billing Panel Email',
    invoice_data_change: 'Update Invoice Data'
  },

  /** Sent to webhook as `reason` (always EN). UI uses i18n `acct-reason-*` per language. */
  ACCOUNTS_REASON_EN: {
    delete_account: 'Delete Account',
    cancel_plan: 'Cancel Plan',
    cancel_linkedin_automation: 'Cancel LinkedIn Automation'
  }
};
