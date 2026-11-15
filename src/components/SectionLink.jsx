import React from 'react';

// In-page link that scrolls to a section without adding `#id` to the URL.
// Scrolling speed follows the CSS `scroll-behavior` (smooth, or instant for
// people who ask their OS for reduced motion). The href stays as a fallback.
const SectionLink = ({ to, children, ...rest }) => {
    const handleClick = (event) => {
        const target = document.getElementById(to);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ block: 'start' });
    };

    return (
        <a href={`#${to}`} onClick={handleClick} {...rest}>
            {children}
        </a>
    );
};

export default SectionLink;
