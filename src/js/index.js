import '../scss/index.scss';
import { analytics } from './analytics.js';
import { logEvent } from "firebase/analytics";

function trackButtonClick(obj) {
    const event = obj.innerText || obj.textContent;
    logEvent(analytics, "click", { name: event });
}

function trackSocialButtonClick(obj) {
    const event = obj.getAttribute('aria-label');
    logEvent(analytics, "click-social", { name: event });
}

function copyLink(url) {
    window.navigator.clipboard.writeText(url);
    confirm("Page URL copied to the clipboard.");
}

// Attach Event Handlers
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.clazz-button-container a').forEach(a => {
    a.addEventListener('click', (e) => {
      trackButtonClick(a);
    });
  });

  document.querySelectorAll('.clazz-social-links a').forEach(a => {
    a.addEventListener('click', (e) => {
      trackSocialButtonClick(a);
    });
  });

  document.querySelectorAll('.clazz-copy-link').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        copyLink(window.location.href);
    });
  });
});