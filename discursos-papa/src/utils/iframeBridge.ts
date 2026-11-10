/**
 * Iframe Resizer & Host Window Communication Bridge
 * Sends dynamic height notifications to host parent window to prevent double scrollbars.
 */

export function setupIframeResizer(): () => void {
  const sendHeight = () => {
    if (typeof window === 'undefined') return;

    // Calculate maximum reliable height
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    // 1. Send standardized JSON message for LA GACETA host CMS / modern embed scripts
    const payload = {
      type: 'gaceta-embed-resize',
      source: 'discursos-papa-leon-xiv',
      height: height,
      timestamp: Date.now(),
    };

    window.parent.postMessage(payload, '*');

    // 2. Secondary fallback payloads for legacy wrappers & iframe-resizer
    window.parent.postMessage({ frameHeight: height }, '*');
    window.parent.postMessage(`[iFrameSizer]${window.name || 'gaceta-iframe'}:${height}:0:mutationObserver`, '*');
  };

  // Immediate send and throttled resize listener
  sendHeight();
  window.addEventListener('resize', sendHeight);
  window.addEventListener('load', sendHeight);

  // ResizeObserver for modern layout transitions
  let resizeObserver: ResizeObserver | null = null;
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      sendHeight();
    });
    resizeObserver.observe(document.body);
    resizeObserver.observe(document.documentElement);
  }

  // MutationObserver for DOM alterations
  const mutationObserver = new MutationObserver(() => {
    sendHeight();
  });

  mutationObserver.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
  });

  // Listen to parent ping requests
  const messageHandler = (event: MessageEvent) => {
    if (event.data && (event.data === 'requestHeight' || event.data.type === 'requestHeight')) {
      sendHeight();
    }
  };
  window.addEventListener('message', messageHandler);

  // Return cleanup function
  return () => {
    window.removeEventListener('resize', sendHeight);
    window.removeEventListener('load', sendHeight);
    window.removeEventListener('message', messageHandler);
    if (resizeObserver) resizeObserver.disconnect();
    mutationObserver.disconnect();
  };
}

export function triggerHeightCheck() {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      const height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      window.parent.postMessage({
        type: 'gaceta-embed-resize',
        source: 'discursos-papa-leon-xiv',
        height: height,
      }, '*');
    }, 50);
  }
}
