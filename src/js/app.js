import '../scss/index.scss'

import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDJMVkse8Mla3rqrVak1qkfXYxlh2AmUd8",
    authDomain: "bvarga-fe600.firebaseapp.com",
    projectId: "bvarga-fe600",
    storageBucket: "bvarga-fe600.appspot.com",
    messagingSenderId: "443364341536",
    appId: "1:443364341536:web:d7b91d4ecfa7618f594945",
    measurementId: "G-PB70YSPDG1"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
  
// Initialize Analytics and get a reference to the service
const analytics = getAnalytics(app);

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
    confirm("Page URL copied to the clipboard.")
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