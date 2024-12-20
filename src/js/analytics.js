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

export function trackEvent(event, element, additionalData = {}) {
    const eventName =  element.getAttribute('aria-label') || obj.innerText || obj.textContent;
    const eventData = {
        name: eventName,
        page_location: window.location.href,
        page_referrer: document.referrer,
        page_title: document.title,
        ...additionalData,
    };
    logEvent(analytics, event, eventData);
}