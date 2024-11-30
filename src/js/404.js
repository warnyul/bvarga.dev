import '../scss/404.scss';
import { trackEvent } from "./analytics.js";

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.clazz-error-container a').forEach(a => {
        a.addEventListener('click', (e) => {
            trackEvent("click", a);
        });
    });
});