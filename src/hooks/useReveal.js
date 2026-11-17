import { useEffect, useRef } from 'react';

// Adds `is-visible` to every `.reveal` element inside the returned ref once it
// scrolls into view (once only), driving the fade-up transition in CSS.
// Pass `deps` when the content inside changes after mount (e.g. a list that
// loads from the API or gets filtered): new `.reveal` elements are picked up
// on each change, and ones already shown stay shown.
export default function useReveal(deps = []) {
    const ref = useRef(null);

    useEffect(() => {
        const root = ref.current;
        if (!root) return undefined;
        const targets = root.querySelectorAll('.reveal:not(.is-visible)');

        if (!('IntersectionObserver' in window)) {
            targets.forEach(el => el.classList.add('is-visible'));
            return undefined;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

        targets.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps

    return ref;
}
