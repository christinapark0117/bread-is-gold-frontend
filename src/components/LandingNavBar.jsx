import React from 'react';
import { Link, NavLink } from 'react-router-dom';

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

const activeClass = ({ isActive }) => (isActive ? 'is-active' : undefined);

const LandingNavBar = () => (
    <header className="landing-nav">
        <Link to="/" className="landing-nav__logo">Bread Is Gold</Link>

        <nav aria-label="Main" className="landing-nav__links">
            <NavLink to="/chefs" className={activeClass}>Chefs</NavLink>
            <NavLink to="/recipes" className={activeClass}>Recipes</NavLink>
            <NavLink to="/favorites" className={activeClass}>My Favorites</NavLink>
            <div className="landing-nav__dropdown">
                <a href="#project" aria-haspopup="true">
                    About
                    <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 3.5l3 3 3-3" /></svg>
                </a>
                <div className="landing-nav__menu">
                    <a href="#project">The Project</a>
                    <a href="#food-for-soul">Food for Soul</a>
                </div>
            </div>
        </nav>

        <div className="landing-nav__icons">
            <Link to="/recipes" aria-label="Search recipes"><SearchIcon /></Link>
            <Link to="/signin" aria-label="Sign in"><UserIcon /></Link>
            <Link to="/favorites" aria-label="My favorites"><HeartIcon /></Link>
        </div>
    </header>
);

export default LandingNavBar;
