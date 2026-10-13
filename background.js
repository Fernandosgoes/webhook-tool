importScripts('config.js');

const TIMEOUT_MS = CONFIG.REQUEST_TIMEOUT_MS;

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action !== 'sendWebhook') return false;

  const payload = message.payload;
  const ACCOUNTS_TYPES = ['delete_account', 'cancel_plan', 'cancel_linkedin_automation', 'confirmation_link'];
  const webhookUrl = ACCOUNTS_TYPES.includes(payload.type)
    ? CONFIG.WEBHOOK_ACCOUNTS_URL
    : CONFIG.WEBHOOK_FASTSPRING_URL;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: controller.signal
  })
    .then(response => {
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.text();
    })
    .then(() => {
      sendResponse({ success: true });
    })
    .catch(err => {
      clearTimeout(timeoutId);
      const errorMsg = err.name === 'AbortError'
        ? 'Timeout: servidor não respondeu em 10s.'
        : `Falha ao enviar: ${err.message}`;
      sendResponse({ success: false, error: errorMsg });
    });

  return true;
});

// Mostra/oculta o painel dentro da página, com efeito "gênio" saindo do ícone da extensão.
// Só fecha pelo X ou clicando no ícone de novo.
function togglePanel(extensionUrl) {
  const ID = 'webhook-tool-panel';
  const existing = document.getElementById(ID);
  const GENIE = [
    { opacity: 0, transform: 'scale(0.06, 0.02) skewX(-24deg)', offset: 0 },
    { opacity: 1, transform: 'scale(0.45, 0.35) skewX(-14deg)', offset: 0.35 },
    { opacity: 1, transform: 'scale(0.9, 1.04) skewX(-3deg)', offset: 0.75 },
    { opacity: 1, transform: 'scale(1, 1) skewX(0deg)', offset: 1 }
  ];
  const TIMING = { duration: 420, easing: 'cubic-bezier(.22,.8,.3,1)', fill: 'both' };

  function closePanel(frame) {
    if (frame.dataset.closing) return;
    frame.dataset.closing = '1';
    frame.animate(GENIE, { ...TIMING, duration: 300, direction: 'reverse', easing: 'ease-in' })
      .finished.then(() => frame.remove(), () => frame.remove());
  }

  if (existing) {
    closePanel(existing);
    return;
  }
  const frame = document.createElement('iframe');
  frame.id = ID;
  frame.src = extensionUrl;
  frame.style.cssText = [
    'position:fixed', 'top:4px', 'right:8px', 'width:436px',
    'height:min(640px,calc(100vh - 16px))', 'border:0', 'border-radius:12px',
    'box-shadow:0 8px 32px rgba(0,0,0,.3)', 'z-index:2147483647',
    'background:transparent', 'color-scheme:normal',
    'transform-origin:calc(100% - 20px) 0'
  ].join(';');
  document.documentElement.appendChild(frame);
  frame.animate(GENIE, TIMING);
  window.addEventListener('message', function onMsg(e) {
    if (e.source === frame.contentWindow && e.data && e.data.type === 'webhooktool-close-panel') {
      closePanel(frame);
      window.removeEventListener('message', onMsg);
    }
  });
}

chrome.action.onClicked.addListener(tab => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: togglePanel,
    args: [chrome.runtime.getURL('popup.html')]
  }).catch(() => {});
});
