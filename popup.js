document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-close').addEventListener('click', () => {
    window.parent.postMessage({ type: 'webhooktool-close-panel' }, '*');
  });

  const STORAGE_KEY_AGENTS = 'webhooktool_agents';
  const STORAGE_KEY_LOG = 'webhooktool_log';

  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const notifyStack = document.getElementById('notify-stack');
  const tabLogBadge = document.getElementById('tab-log-badge');

  const formConf = document.getElementById('form-confirmation');
  const confEmail = document.getElementById('conf-email');
  const confLink = document.getElementById('conf-link');
  const confAgent = document.getElementById('conf-agent');
  const confSubmit = document.getElementById('conf-submit');

  const formFs = document.getElementById('form-fastspring');
  const fsEmail = document.getElementById('fs-email');
  const fsReason = document.getElementById('fs-reason');
  const fsAgent = document.getElementById('fs-agent');
  const fsSubmit = document.getElementById('fs-submit');
  const fsAfterReason = document.getElementById('fs-after-reason');
  const fsEmailChangeFields = document.getElementById('fs-email-change-fields');
  const fsInvoiceFields = document.getElementById('fs-invoice-fields');
  const fsEmailFrom = document.getElementById('fs-email-from');
  const fsEmailTo = document.getElementById('fs-email-to');
  const fsNotes = document.getElementById('fs-notes');

  const formAccounts = document.getElementById('form-accounts');
  const accReason = document.getElementById('acc-reason');
  const accEmail = document.getElementById('acc-email');
  const accAgent = document.getElementById('acc-agent');
  const accSubmit = document.getElementById('acc-submit');
  const accAfterReason = document.getElementById('acc-after-reason');
  const accRegion = document.getElementById('acc-region');

  const agentNameInput = document.getElementById('agent-name-input');
  const btnAddAgent = document.getElementById('btn-add-agent');
  const agentListEl = document.getElementById('agent-list');
  const noAgentsMsg = document.getElementById('no-agents-msg');
  const aboutVersion = document.getElementById('about-version');
  const aboutModal = document.getElementById('about-modal');
  const btnAbout = document.getElementById('btn-about');
  const aboutModalClose = document.getElementById('about-modal-close');

  const logList = document.getElementById('log-list');
  const logClear = document.getElementById('log-clear');
  const btnLangToggle = document.getElementById('btn-lang-toggle');
  const btnSettings = document.getElementById('btn-settings');
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const copyEmailLabel = document.getElementById('copy-email-label');
  const LANG_CYCLE = ['pt', 'en'];

  const FASTSPRING_REASON_I18N_KEYS = {
    whitelist: 'fs-reason-whitelist',
    email_change: 'fs-reason-email-change',
    invoice_data_change: 'fs-reason-invoice-data',
  };

  const ACCOUNTS_REASON_I18N_KEYS = {
    delete_account: 'acct-reason-delete',
    cancel_plan: 'acct-reason-cancel-plan',
    cancel_linkedin_automation: 'acct-reason-cancel-linkedin'
  };

  // --- i18n init ---
  applyLanguage(currentLang);

  if (aboutVersion) {
    aboutVersion.textContent = CONFIG.VERSION;
  }

  // --- Language toggle (header) ---
  if (btnLangToggle) {
    btnLangToggle.addEventListener('click', () => {
      const i = LANG_CYCLE.indexOf(currentLang);
      const next = LANG_CYCLE[(i + 1) % LANG_CYCLE.length];
      applyLanguage(next);
      loadLog();
    });
  }

  // --- Settings button (header) ---
  if (btnSettings) {
    btnSettings.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      const settingsPanel = document.getElementById('tab-settings');
      if (settingsPanel) settingsPanel.classList.add('active');
    });
  }

  // --- About modal ---
  function openAboutModal() {
    if (aboutModal) aboutModal.hidden = false;
  }

  function closeAboutModal() {
    if (aboutModal) aboutModal.hidden = true;
  }

  if (btnAbout) {
    btnAbout.addEventListener('click', openAboutModal);
  }
  if (aboutModalClose) {
    aboutModalClose.addEventListener('click', closeAboutModal);
  }

  // --- Copy email ---
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      navigator.clipboard.writeText('https://github.com/Fernandosgoes/webhook-tool/issues').then(() => {
        btnCopyEmail.classList.add('copied');
        if (copyEmailLabel) copyEmailLabel.textContent = t('about-bug-copied');
        setTimeout(() => {
          btnCopyEmail.classList.remove('copied');
          if (copyEmailLabel) copyEmailLabel.textContent = t('about-bug-copy');
        }, 2000);
      });
    });
  }
  if (aboutModal) {
    aboutModal.addEventListener('click', (e) => {
      if (e.target === aboutModal) closeAboutModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aboutModal && !aboutModal.hidden) {
      closeAboutModal();
    }
  });

  loadAgents();
  loadLog();

  // --- Tabs ---
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${targetTab}`).classList.add('active');
    });
  });

  // --- Suppress button hover while any select dropdown is open ---
  document.querySelectorAll('select').forEach(sel => {
    sel.addEventListener('mousedown', () => {
      sel.closest('form').classList.add('select-open');
    });
    sel.addEventListener('change', () => {
      sel.closest('form').classList.remove('select-open');
    });
    sel.addEventListener('blur', () => {
      sel.closest('form').classList.remove('select-open');
    });
  });

  function updateFastspringReasonStep() {
    const reason = fsReason.value;
    const showDetails = Boolean(reason);

    if (fsAfterReason) fsAfterReason.hidden = !showDetails;

    if (!showDetails) {
      fsEmail.value = '';
      fsAgent.value = '';
      fsEmailFrom.value = '';
      fsEmailTo.value = '';
      fsNotes.value = '';
      fsEmailChangeFields.hidden = true;
      fsInvoiceFields.hidden = true;
      fsEmail.parentElement.hidden = false;
      clearFieldError(fsEmail);
      clearFieldError(fsAgent);
      clearFieldError(fsReason);
      clearFieldError(fsEmailFrom);
      clearFieldError(fsEmailTo);
      clearFieldError(fsNotes);
      return;
    }

    fsEmailChangeFields.hidden = reason !== 'email_change';
    fsInvoiceFields.hidden = reason !== 'invoice_data_change';
    fsEmail.parentElement.hidden = reason === 'email_change';

    if (reason !== 'email_change') {
      fsEmailFrom.value = '';
      fsEmailTo.value = '';
      clearFieldError(fsEmailFrom);
      clearFieldError(fsEmailTo);
    }
    if (reason !== 'invoice_data_change') {
      fsNotes.value = '';
      clearFieldError(fsNotes);
    }
  }

  fsReason.addEventListener('change', updateFastspringReasonStep);
  updateFastspringReasonStep();

  function updateAccountsReasonStep() {
    const show = Boolean(accReason.value);
    if (accAfterReason) accAfterReason.hidden = !show;
    if (!show) {
      accRegion.value = '';
      accEmail.value = '';
      accAgent.value = '';
      clearFieldError(accRegion);
      clearFieldError(accEmail);
      clearFieldError(accAgent);
      clearFieldError(accReason);
    }
  }

  accReason.addEventListener('change', updateAccountsReasonStep);
  updateAccountsReasonStep();

  // --- Confirmation form submit ---
  formConf.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateConfirmationForm()) return;

    const payload = {
      type: 'confirmation_link',
      email: confEmail.value.trim(),
      confirmation_link: confLink.value.trim(),
      agent_name: confAgent.value,
      timestamp: new Date().toISOString()
    };

    await sendWebhook(payload, confSubmit, () => {
      formConf.reset();
      clearAllErrors(formConf);
    });
  });

  // --- Fastspring form submit ---
  formFs.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateFastspringForm()) return;

    const reason_code = fsReason.value;
    const payload = {
      type: 'fastspring_request',
      reason_code,
      reason: CONFIG.FASTSPRING_REASON_EN[reason_code] || reason_code,
      agent_name: fsAgent.value,
      timestamp: new Date().toISOString()
    };

    if (reason_code !== 'email_change') {
      payload.email = fsEmail.value.trim();
    }

    if (reason_code === 'email_change') {
      payload.email_from = fsEmailFrom.value.trim();
      payload.email_to = fsEmailTo.value.trim();
    }

    if (reason_code === 'invoice_data_change') {
      payload.notes = fsNotes.value.trim();
    }

    await sendWebhook(payload, fsSubmit, () => {
      formFs.reset();
      updateFastspringReasonStep();
      clearAllErrors(formFs);
    });
  });

  // --- Accounts form submit ---
  formAccounts.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateAccountsForm()) return;

    const reason_code = accReason.value;
    const payload = {
      type: reason_code,
      reason: CONFIG.ACCOUNTS_REASON_EN[reason_code] || reason_code,
      region: accRegion.value,
      email: accEmail.value.trim(),
      agent_name: accAgent.value,
      timestamp: new Date().toISOString()
    };

    await sendWebhook(payload, accSubmit, () => {
      formAccounts.reset();
      updateAccountsReasonStep();
      clearAllErrors(formAccounts);
    });
  });

  // --- Webhook sender ---
  async function sendWebhook(payload, submitBtn, onSuccess) {
    if (submitBtn) setSubmitLoading(submitBtn, true);
    try {
      await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
          { action: 'sendWebhook', payload },
          (resp) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else if (resp && resp.success) {
              resolve(resp);
            } else {
              reject(new Error(resp?.error || 'Error'));
            }
          }
        );
      });

      showNotify(t('notify-success'), 'success');
      addLogEntry(payload);
      if (onSuccess) onSuccess();
    } catch (err) {
      showNotify(err.message || t('err-send-fail'), 'error');
    } finally {
      if (submitBtn) setSubmitLoading(submitBtn, false);
    }
  }

  function setSubmitLoading(btn, loading) {
    btn.disabled = loading;
    btn.classList.toggle('is-loading', loading);
    btn.setAttribute('aria-busy', loading ? 'true' : 'false');
  }

  // --- Validation helpers ---
  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateURL(value) {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  function setFieldError(input, message) {
    input.classList.add('error');
    const errorEl = input.parentElement.querySelector('.field-error');
    if (errorEl) errorEl.textContent = message;
  }

  function clearFieldError(input) {
    input.classList.remove('error');
    const errorEl = input.parentElement.querySelector('.field-error');
    if (errorEl) errorEl.textContent = '';
  }

  function clearAllErrors(form) {
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.field-error').forEach(el => el.textContent = '');
  }

  function validateConfirmationForm() {
    let valid = true;
    clearAllErrors(formConf);

    if (!confEmail.value.trim() || !validateEmail(confEmail.value.trim())) {
      setFieldError(confEmail, t('err-email'));
      valid = false;
    }

    if (!confLink.value.trim()) {
      setFieldError(confLink, t('err-link-required'));
      valid = false;
    }

    if (!confAgent.value) {
      setFieldError(confAgent, t('err-agent'));
      valid = false;
    }

    return valid;
  }

  function validateFastspringForm() {
    let valid = true;
    clearAllErrors(formFs);

    const reason = fsReason.value;

    if (!reason) {
      setFieldError(fsReason, t('err-reason'));
      return false;
    }

    if (reason !== 'email_change') {
      if (!fsEmail.value.trim() || !validateEmail(fsEmail.value.trim())) {
        setFieldError(fsEmail, t('err-email'));
        valid = false;
      }
    }

    if (reason === 'email_change') {
      if (!fsEmailFrom.value.trim() || !validateEmail(fsEmailFrom.value.trim())) {
        setFieldError(fsEmailFrom, t('err-email-from'));
        valid = false;
      }
      if (!fsEmailTo.value.trim() || !validateEmail(fsEmailTo.value.trim())) {
        setFieldError(fsEmailTo, t('err-email-to'));
        valid = false;
      }
    }

    if (reason === 'invoice_data_change' && !fsNotes.value.trim()) {
      setFieldError(fsNotes, t('err-invoice-notes'));
      valid = false;
    }

    if (!fsAgent.value) {
      setFieldError(fsAgent, t('err-agent'));
      valid = false;
    }

    return valid;
  }

  function validateAccountsForm() {
    let valid = true;
    clearAllErrors(formAccounts);

    if (!accReason.value) {
      setFieldError(accReason, t('err-acct-reason'));
      return false;
    }

    if (!accRegion.value) {
      setFieldError(accRegion, t('err-region'));
      valid = false;
    }

    if (!accEmail.value.trim() || !validateEmail(accEmail.value.trim())) {
      setFieldError(accEmail, t('err-email'));
      valid = false;
    }

    if (!accAgent.value) {
      setFieldError(accAgent, t('err-agent'));
      valid = false;
    }

    return valid;
  }

  // --- Agents ---
  function getAgents() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_AGENTS)) || [];
    } catch {
      return [];
    }
  }

  function saveAgents(agents) {
    localStorage.setItem(STORAGE_KEY_AGENTS, JSON.stringify(agents));
  }

  function loadAgents() {
    const agents = getAgents();
    renderAgentList(agents);
    populateAgentDropdowns(agents);
  }

  function renderAgentList(agents) {
    agentListEl.innerHTML = '';
    noAgentsMsg.hidden = agents.length > 0;

    agents.forEach((name, idx) => {
      const li = document.createElement('li');
      li.className = 'agent-item';
      li.innerHTML = `
        <span class="agent-name">${escapeHtml(name)}</span>
        <button type="button" class="btn-remove-agent" data-idx="${idx}" title="&#10005;">&times;</button>
      `;
      agentListEl.appendChild(li);
    });

    agentListEl.querySelectorAll('.btn-remove-agent').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const agents = getAgents();
        agents.splice(idx, 1);
        saveAgents(agents);
        loadAgents();
      });
    });
  }

  function populateAgentDropdowns(agents) {
    [confAgent, fsAgent, accAgent].forEach(select => {
      const currentVal = select.value;
      const options = select.querySelectorAll('option:not(:first-child)');
      options.forEach(opt => opt.remove());

      agents.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        select.appendChild(opt);
      });

      if (agents.includes(currentVal)) {
        select.value = currentVal;
      }
    });
  }

  btnAddAgent.addEventListener('click', addAgent);
  agentNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAgent();
    }
  });

  function addAgent() {
    const name = agentNameInput.value.trim();
    if (!name) return;

    const agents = getAgents();
    if (agents.some(a => a.toLowerCase() === name.toLowerCase())) {
      showNotify(t('notify-agent-exists'), 'error');
      return;
    }

    agents.push(name);
    saveAgents(agents);
    agentNameInput.value = '';
    loadAgents();
    showNotify(t('notify-agent-added', { name }), 'success');
  }

  // --- Log ---
  function loadLog() {
    chrome.storage.session.get([STORAGE_KEY_LOG], (result) => {
      let entries = result[STORAGE_KEY_LOG];
      if (!Array.isArray(entries)) entries = [];
      renderLog(entries);
    });
  }

  function getLogTypeLabel(payload) {
    if (payload.type === 'confirmation_link') {
      return t('log-type-confirmation');
    }
    if (ACCOUNTS_REASON_I18N_KEYS[payload.type]) {
      const reasonLabel = t(ACCOUNTS_REASON_I18N_KEYS[payload.type]);
      return `${t('log-type-accounts')} — ${reasonLabel}`;
    }
    const reasonKey = FASTSPRING_REASON_I18N_KEYS[payload.reason_code || payload.reason];
    const reasonLabel = reasonKey ? t(reasonKey) : (payload.reason_code || payload.reason);
    return `${t('log-type-fastspring')} — ${reasonLabel}`;
  }

  function getLocaleTag() {
    return currentLang === 'en' ? 'en-US' : 'pt-BR';
  }

  function addLogEntry(payload) {
    chrome.storage.session.get([STORAGE_KEY_LOG], (result) => {
      let entries = result[STORAGE_KEY_LOG];
      if (!Array.isArray(entries)) entries = [];

      const email = payload.email || payload.email_from || '—';

      entries.unshift({
        type: getLogTypeLabel(payload),
        email,
        agent: payload.agent_name,
        time: new Date().toLocaleTimeString(getLocaleTag(), { hour: '2-digit', minute: '2-digit' }),
        payload
      });

      if (entries.length > CONFIG.MAX_LOG_ENTRIES) {
        entries = entries.slice(0, CONFIG.MAX_LOG_ENTRIES);
      }

      chrome.storage.session.set({ [STORAGE_KEY_LOG]: entries }, () => {
        renderLog(entries);
      });
    });
  }

  function renderLog(entries) {
    logList.innerHTML = '';
    const count = entries.length;
    tabLogBadge.textContent = count;
    tabLogBadge.hidden = count === 0;

    if (count === 0) {
      logList.innerHTML = `<li class="log-empty" data-i18n="log-empty">${t('log-empty')}</li>`;
      return;
    }

    entries.forEach((entry, idx) => {
      const li = document.createElement('li');
      li.className = 'log-entry';
      li.innerHTML = `
        <div class="log-entry-top">
          <span class="log-type">${escapeHtml(entry.type)}</span>
          <span class="log-time">${escapeHtml(entry.time)}</span>
        </div>
        <div class="log-entry-bottom">
          <span class="log-detail">${escapeHtml(entry.email)} — ${escapeHtml(entry.agent)}</span>
          ${entry.payload ? `<button type="button" class="log-resend-btn" data-idx="${idx}" title="${t('log-resend')}">&#8635;</button>` : ''}
        </div>
      `;
      logList.appendChild(li);
    });

    logList.querySelectorAll('.log-resend-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const idx = parseInt(btn.dataset.idx, 10);
        chrome.storage.session.get([STORAGE_KEY_LOG], async (result) => {
          const allEntries = result[STORAGE_KEY_LOG] || [];
          const entry = allEntries[idx];
          if (!entry || !entry.payload) return;
          const resendPayload = { ...entry.payload, timestamp: new Date().toISOString() };
          if (resendPayload.type === 'fastspring_request' && resendPayload.reason_code) {
            resendPayload.reason =
              CONFIG.FASTSPRING_REASON_EN[resendPayload.reason_code] || resendPayload.reason;
          }
          try {
            await new Promise((resolve, reject) => {
              chrome.runtime.sendMessage(
                { action: 'sendWebhook', payload: resendPayload },
                (resp) => {
                  if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
                  else if (resp && resp.success) resolve(resp);
                  else reject(new Error(resp?.error || 'Error'));
                }
              );
            });
            showNotify(t('notify-resend-success'), 'success');
            addLogEntry(resendPayload);
          } catch (err) {
            showNotify(err.message || t('err-send-fail'), 'error');
          }
        });
      });
    });
  }

  logClear.addEventListener('click', () => {
    chrome.storage.session.set({ [STORAGE_KEY_LOG]: [] }, () => {
      renderLog([]);
      showNotify(t('notify-log-cleared'), 'success');
    });
  });

  // --- Notifications ---
  function showNotify(message, type) {
    const el = document.createElement('div');
    el.className = `notify notify--${type}`;
    el.textContent = message;
    notifyStack.appendChild(el);

    requestAnimationFrame(() => {
      el.classList.add('notify--in');
    });

    setTimeout(() => {
      el.classList.remove('notify--in');
      el.classList.add('notify--out');
      setTimeout(() => el.remove(), 300);
    }, 1800);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
});
