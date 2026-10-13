const TRANSLATIONS = {
  pt: {
    'header-title': 'Webhook Tool',
    'tab-confirmation': 'Link de confirmação',
    'tab-fastspring': 'Fastspring',
    'tab-log': 'Log',
    'tab-settings': 'Configurações',
    'label-email': 'Email do destinatário',
    'label-conf-link': 'Link de confirmação',
    'label-agent': 'Agente',
    'placeholder-email': 'usuario@email.com',
    'placeholder-url': 'https://...',
    'placeholder-text': 'Cole o link ou texto aqui...',
    'placeholder-agent-select': 'Selecione o agente',
    'btn-submit': 'Enviar',
    'btn-submitting': 'Enviando...',
    'label-reason': 'Motivo da requisição',
    'fs-reason-placeholder': 'Selecione o motivo',
    'fs-reason-whitelist': 'Solicitação de Whitelist',
    'fs-reason-email-change': 'Atualizar Email do Painel de Cobrança',
    'fs-reason-invoice-data': 'Atualizar Dados da Fatura',
    'label-email-from': 'From (email antigo)',
    'label-email-to': 'To (novo email)',
    'label-invoice-notes': 'Descrição das alterações necessárias',
    'placeholder-email-from': 'antigo@email.com',
    'placeholder-email-to': 'novo@email.com',
    'placeholder-invoice-notes': 'Descreva as alterações de dados do invoice...',
    'settings-language-title': 'Idioma',
    'lang-toggle-aria': 'Idioma da interface: {name}. Clique para alternar.',
    'settings-agents-title': 'Cadastro de Agentes',
    'placeholder-agent-name': 'Nome do agente',
    'no-agents': 'Nenhum agente cadastrado.',
    'log-title': 'Log de envios',
    'log-hint': 'Mantido até você fechar o navegador por completo.',
    'log-clear': 'Limpar',
    'log-empty': 'Nenhum envio registrado.',
    'log-resend': 'Reenviar',
    'about-title': 'Sobre',
    'about-product': 'Webhook Tool',
    'about-version-label': 'Versão',
    'about-internal': 'Extensão para envio de requisições via webhook (Make, n8n e similares), usada para disparar e-mails e follow-ups padronizados.',
    'about-close': 'Fechar',
    'notify-success': 'Informação enviada com sucesso.',
    'notify-log-cleared': 'Log limpo.',
    'notify-agent-exists': 'Agente já cadastrado.',
    'notify-agent-added': 'Agente "{name}" adicionado.',
    'notify-resend-success': 'Reenvio realizado com sucesso.',
    'err-email': 'Insira um email válido.',
    'err-link-required': 'Insira o link ou texto de confirmação.',
    'err-url': 'Insira uma URL válida.',
    'err-agent': 'Selecione um agente.',
    'err-reason': 'Selecione um motivo.',
    'err-email-from': 'Insira o email antigo válido.',
    'err-email-to': 'Insira o novo email válido.',
    'err-invoice-notes': 'Descreva as alterações necessárias.',
    'err-send-fail': 'Falha ao enviar. Tente novamente.',
    'label-region': 'Região',
    'region-placeholder': 'Selecione a região',
    'region-global': 'Global',
    'region-brazil': 'Brazil',
    'err-region': 'Selecione a região.',
    'log-type-confirmation': 'Link Confirmação',
    'log-type-fastspring': 'Fastspring',
    'log-type-accounts': 'Contas',
    'tab-accounts': 'Contas',
    'acct-reason-placeholder': 'Selecione o tipo',
    'acct-reason-delete': 'Deletar conta',
    'acct-reason-cancel-plan': 'Cancelar plano',
    'acct-reason-cancel-linkedin': 'Cancelar LinkedIn Automation',
    'err-acct-reason': 'Selecione o tipo de solicitação.',
    'about-bug-title': 'Reportar Bug',
    'about-bug-desc': 'Encontrou um problema? Descreva o que aconteceu e envie para o email abaixo.',
    'about-bug-copy': 'Copiar email',
    'about-bug-copied': 'Copiado!',
    'settings-aria': 'Configurações'
  },

  en: {
    'header-title': 'Webhook Tool',
    'tab-confirmation': 'Confirm Link',
    'tab-fastspring': 'Fastspring',
    'tab-log': 'Log',
    'tab-settings': 'Settings',
    'label-email': 'Recipient email',
    'label-conf-link': 'Confirmation link',
    'label-agent': 'Agent',
    'placeholder-email': 'user@email.com',
    'placeholder-url': 'https://...',
    'placeholder-text': 'Paste link or text here...',
    'placeholder-agent-select': 'Select agent',
    'btn-submit': 'Submit',
    'btn-submitting': 'Submitting...',
    'label-reason': 'Request reason',
    'fs-reason-placeholder': 'Select reason',
    'fs-reason-whitelist': 'Whitelist Request',
    'fs-reason-email-change': 'Update Billing Panel Email',
    'fs-reason-invoice-data': 'Update Invoice Data',
    'label-email-from': 'From (old email)',
    'label-email-to': 'To (new email)',
    'label-invoice-notes': 'Description of required changes',
    'placeholder-email-from': 'old@email.com',
    'placeholder-email-to': 'new@email.com',
    'placeholder-invoice-notes': 'Describe the invoice data changes...',
    'settings-language-title': 'Language',
    'lang-toggle-aria': 'Interface language: {name}. Click to switch.',
    'settings-agents-title': 'Agent Management',
    'placeholder-agent-name': 'Agent name',
    'no-agents': 'No agents registered.',
    'log-title': 'Submission Log',
    'log-hint': 'Kept until you fully close the browser.',
    'log-clear': 'Clear',
    'log-empty': 'No submissions recorded.',
    'log-resend': 'Resend',
    'about-title': 'About',
    'about-product': 'Webhook Tool',
    'about-version-label': 'Version',
    'about-internal': 'Extension for sending requests via webhook (Make, n8n and similar), used to trigger standardized emails and follow-ups.',
    'about-close': 'Close',
    'notify-success': 'Information sent successfully.',
    'notify-log-cleared': 'Log cleared.',
    'notify-agent-exists': 'Agent already registered.',
    'notify-agent-added': 'Agent "{name}" added.',
    'notify-resend-success': 'Resend completed successfully.',
    'err-email': 'Enter a valid email.',
    'err-link-required': 'Enter the confirmation link or text.',
    'err-url': 'Enter a valid URL.',
    'err-agent': 'Select an agent.',
    'err-reason': 'Select a reason.',
    'err-email-from': 'Enter a valid old email.',
    'err-email-to': 'Enter a valid new email.',
    'err-invoice-notes': 'Describe the required changes.',
    'err-send-fail': 'Failed to send. Please try again.',
    'label-region': 'Region',
    'region-placeholder': 'Select region',
    'region-global': 'Global',
    'region-brazil': 'Brazil',
    'err-region': 'Select a region.',
    'log-type-confirmation': 'Confirmation Link',
    'log-type-fastspring': 'Fastspring',
    'log-type-accounts': 'Accounts',
    'tab-accounts': 'Accounts',
    'acct-reason-placeholder': 'Select type',
    'acct-reason-delete': 'Delete Account',
    'acct-reason-cancel-plan': 'Cancel Plan',
    'acct-reason-cancel-linkedin': 'Cancel LinkedIn Automation',
    'err-acct-reason': 'Select request type.',
    'about-bug-title': 'Report a Bug',
    'about-bug-desc': 'Found an issue? Describe what happened and send it to the email below.',
    'about-bug-copy': 'Copy email',
    'about-bug-copied': 'Copied!',
    'settings-aria': 'Settings'
  }
};

const STORAGE_KEY_LANG = 'webhooktool_lang';
let currentLang = localStorage.getItem(STORAGE_KEY_LANG) || 'pt';

function t(key, replacements) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.pt;
  let str = dict[key] || TRANSLATIONS.pt[key] || key;
  if (replacements) {
    Object.entries(replacements).forEach(([k, v]) => {
      str = str.replace(`{${k}}`, v);
    });
  }
  return str;
}

function applyLanguage(lang) {
  if (!TRANSLATIONS[lang]) lang = 'pt';
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY_LANG, lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.title = t(key);
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria-label');
    el.setAttribute('aria-label', t(key));
  });

  syncLangToggleUI(lang);

  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
}

function syncLangToggleUI(lang) {
  const btn = document.getElementById('btn-lang-toggle');
  if (!btn) return;
  const codes = { pt: 'PT', en: 'EN' };
  const native = { pt: 'Português', en: 'English' };
  const codeEl = btn.querySelector('.lang-code');
  if (codeEl) codeEl.textContent = codes[lang] || 'PT';
  const name = native[lang] || native.pt;
  const aria = t('lang-toggle-aria', { name });
  btn.setAttribute('aria-label', aria);
  btn.title = aria;
}
