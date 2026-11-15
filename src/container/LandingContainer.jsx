import React from 'react';
import { Link } from 'react-router-dom';
import LandingNavBar from '../components/LandingNavBar';
import FeaturedChefs from '../components/FeaturedChefs';
import useReveal from '../hooks/useReveal';
import heroImage from '../image/Bread Is Gold Homepage Banner.PNG';
import projectImage from '../image/extraordinary food.jpg';
import foodForSoulLogo from '../image/FOOD+FOR+SOUL_LOGOTYPE.png';
import '../LandingContainer.css';

const ArrowIcon = () => (
    <svg aria-hidden="true" width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M0 6h20M15 1l5 5-5 5" />
    </svg>
);

const delay = (seconds) => ({ '--reveal-delay': `${seconds}s` });

const LandingContainer = () => {
    const revealRef = useReveal();

    return (
        <div className="landing" ref={revealRef}>
            <section className="landing-hero" style={{ '--hero-image': `url("${heroImage}")` }}>
                <div className="landing-hero__bg" aria-hidden="true" />
                <LandingNavBar />
                <div className="landing-hero__content">
                    <p className="landing-eyebrow landing-eyebrow--light">Massimo Bottura's</p>
                    <h1 className="landing-hero__title">Bread <em>Is</em> Gold</h1>
                    <span className="landing-hero__rule" aria-hidden="true" />
                    <p className="landing-hero__subtitle">Recipes, Chefs, and a Message<br />Against Food Waste</p>
                    <Link to="/recipes" className="landing-button landing-button--light">
                        Explore recipes <ArrowIcon />
                    </Link>
                </div>
                <a href="#project" className="landing-hero__scroll">
                    Scroll
                    <svg aria-hidden="true" width="20" height="10" viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 1l9 8 9-8" /></svg>
                </a>
            </section>

            <main>
                <section id="project" className="landing-split">
                    <div className="landing-split__text reveal">
                        <p className="landing-eyebrow">The Project</p>
                        <h2 className="landing-heading">Extraordinary Food.<br />Shared Purpose.</h2>
                        <p className="landing-body">
                            Led by Massimo Bottura and brought to life by 45 renowned chefs, <em>Bread Is Gold</em> features
                            over 150 recipes that transform everyday and overlooked ingredients into extraordinary meals.
                            More than a cookbook, it celebrates creativity, dignity, and the power of food to bring people together.
                        </p>
                        <a href="#food-for-soul" className="landing-button">Our story <ArrowIcon /></a>
                    </div>
                    <div className="landing-split__plate reveal" style={delay(0.15)}>
                        <img src={projectImage} alt="Bright yellow sauce splashed across a cracked white plate" />
                    </div>
                </section>

                <section id="food-for-soul" className="landing-split landing-split--ruled">
                    <a className="landing-split__logo reveal" href="https://www.foodforsoul.it" target="_blank" rel="noopener noreferrer">
                        <img src={foodForSoulLogo} alt="Food for Soul" />
                    </a>
                    <div className="landing-split__text reveal" style={delay(0.15)}>
                        <p className="landing-eyebrow">Food for Soul</p>
                        <h2 className="landing-heading">Food for Soul</h2>
                        <p className="landing-body">
                            Founded by Massimo Bottura, Food for Soul is a non-profit organization that tackles food waste,
                            promotes social inclusion, and creates welcoming spaces where dignity is served alongside a meal.
                        </p>
                        <a href="https://www.foodforsoul.it" target="_blank" rel="noopener noreferrer" className="landing-button">
                            Learn more <ArrowIcon />
                        </a>
                    </div>
                </section>

                <FeaturedChefs />
            </main>
        </div>
    );
};

export default LandingContainer;
