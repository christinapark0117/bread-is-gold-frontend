import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import SectionLink from './SectionLink';
import '../SiteNavBar.css';

const SearchIcon = () => (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
    </svg>
);

const UserIcon = () => (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </svg>
);

const HeartIcon = () => (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
    </svg>
);


// The one nav bar for the whole site.
// mode="hero"   home page, on top of the banner photo (white text)
// mode="pinned" home page, banner scrolled away: light bar fixed to the top
// mode="page"   every other page: light bar, sticky at the top
const MODE_CLASS = {
    hero: 'site-nav',
    pinned: 'site-nav is-stuck',
    page: 'site-nav is-stuck is-static',
};

const SiteNavBar = ({ mode = 'page' }) => {
    // A chef's recipe list lives at /recipes/chefs/:id but belongs under Chefs.
    const { pathname } = useLocation();
    const onChefPage = pathname.startsWith('/recipes/chefs');
    const activeClass = (activeHere) => ({ isActive }) => (isActive && activeHere ? 'is-active' : undefined);

    return (
    <header className={MODE_CLASS[mode]}>
        <Link to="/" className="site-nav__logo">Bread Is Gold</Link>

        <nav aria-label="Main" className="site-nav__links">
            <NavLink to="/chefs" className={({ isActive }) => (isActive || onChefPage ? 'is-active' : undefined)}>Chefs</NavLink>
            <NavLink to="/recipes" className={activeClass(!onChefPage)}>Recipes</NavLink>
            <NavLink to="/favorites" className={activeClass(true)}>My Favorites</NavLink>
            <div className="site-nav__dropdown">
                <SectionLink to="story" aria-haspopup="true">
                    About
                    <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 3.5l3 3 3-3" /></svg>
                </SectionLink>
                <div className="site-nav__menu">
                    <SectionLink to="story">The Project</SectionLink>
                    <SectionLink to="food-for-soul">Food for Soul</SectionLink>
                </div>
            </div>
        </nav>

        <div className="site-nav__icons">
            <Link to="/recipes" aria-label="Search recipes"><SearchIcon /></Link>
            <Link to="/signin" aria-label="Sign in"><UserIcon /></Link>
            <Link to="/favorites" aria-label="My favorites"><HeartIcon /></Link>
        </div>
    </header>
    );
};

export default SiteNavBar;
