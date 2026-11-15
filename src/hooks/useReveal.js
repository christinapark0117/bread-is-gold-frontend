import { useEffect, useRef } from 'react';

// Adds `is-visible` to every `.reveal` element inside the returned ref once it
// scrolls into view (once only), driving the fade-up transition in CSS.
export default function useReveal() {
    const ref = useRef(null);

    useEffect(() => {
        const root = ref.current;
        if (!root) return undefined;
        const targets = root.querySelectorAll('.reveal');

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
    }, []);

    return ref;
}
