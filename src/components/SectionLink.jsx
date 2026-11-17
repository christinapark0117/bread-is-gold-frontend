import React from 'react';
import { useNavigate } from 'react-router-dom';

// Link to a section of the home page, without adding `#id` to the URL.
// - On the home page: scrolls there (smoothly, per the CSS `scroll-behavior`;
//   instantly for people who ask their OS for reduced motion).
// - On any other page: goes to the home page and lands on that section
//   (LandingContainer reads `state.section`).
// The href stays as a fallback for opening in a new tab.
const SectionLink = ({ to, children, ...rest }) => {
    const navigate = useNavigate();

    const handleClick = (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        const target = document.getElementById(to);
        if (target) {
            target.scrollIntoView({ block: 'start' });
        } else {
            navigate('/', { state: { section: to } });
        }
    };

    return (
        <a href={`/#${to}`} onClick={handleClick} {...rest}>
            {children}
        </a>
    );
};

export default SectionLink;
