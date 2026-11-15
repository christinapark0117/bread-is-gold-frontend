import { useEffect, useRef, useState } from 'react';

// Tracks two things while the home page scrolls:
// - navStuck: the hero banner has scrolled out of view, so the nav bar
//   should follow the page as a solid bar.
// - atChefs: Featured Chefs (the last section) fills the screen, so the
//   "SCROLL ↓" cue above it has nothing left to point at.
export default function useLandingScroll() {
    const heroRef = useRef(null);
    const chefsRef = useRef(null);
    const [navStuck, setNavStuck] = useState(false);
    const [atChefs, setAtChefs] = useState(false);

    useEffect(() => {
        // React skips the re-render when a value hasn't changed, so running
        // this on every scroll event is cheap.
        const update = () => {
            const hero = heroRef.current;
            const chefs = chefsRef.current;
            if (hero) setNavStuck(hero.getBoundingClientRect().bottom <= 1);
            if (chefs) setAtChefs(chefs.getBoundingClientRect().top < window.innerHeight * 0.6);
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    return { heroRef, chefsRef, navStuck, atChefs };
}
