import '../scss/index.scss';
import { trackEvent } from "./analytics.js";

function copyLinkToClipboard(url) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            alert('Page URL copied to the clipboard.');
        }).catch(() => {
            alert('Failed to copy the URL. Please copy manually.');
        });
    } else {
        alert('Clipboard API is not supported in this browser.');
    }
}

// Attach Event Handlers
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.clazz-button-container a').forEach(a => {
        a.addEventListener('click', (e) => {
            trackEvent("click", a);
        });
    });

    document.querySelectorAll('.clazz-social-links a').forEach(a => {
        a.addEventListener('click', (e) => {
            trackEvent("social-click", a);
        });
    });

    document.querySelectorAll('.clazz-copy-link').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            copyLinkToClipboard(window.location.href);
        });
    });
});