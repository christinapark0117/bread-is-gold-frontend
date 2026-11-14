import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Who to feature on the home page and where they cook.
// Images and ids come from the API; country isn't stored in the DB yet.
const FEATURED = [
    { lastName: 'Bottura', name: 'Massimo Bottura', country: 'Italy' },
    { lastName: 'Humm', name: 'Daniel Humm', country: 'United States' },
    { lastName: 'Collagreco', name: 'Mauro Colagreco', country: 'France' },
];

const ArrowIcon = () => (
    <svg aria-hidden="true" width="20" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M0 6h20M15 1l5 5-5 5" />
    </svg>
);

const FeaturedChefs = () => {
    const [chefs, setChefs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/chefs')
            .then(resp => resp.json())
            .then(setChefs)
            .catch(() => setChefs([]));
    }, []);

    const cards = FEATURED.map(featured => {
        const chef = chefs.find(c => c.last_name === featured.lastName);
        return {
            ...featured,
            image: chef ? chef.chef_image : null,
            to: chef ? `/recipes/chefs/${chef.id}` : '/chefs',
        };
    });

    return (
        <section className="landing-chefs" aria-labelledby="featured-chefs-title">
            <h2 id="featured-chefs-title" className="landing-rule-title">Featured Chefs</h2>
            <div className="landing-chefs__grid">
                {cards.map(card => (
                    <article className="landing-chef-card" key={card.lastName}>
                        <div className="landing-chef-card__photo">
                            {card.image && <img src={card.image} alt={`Chef ${card.name}`} />}
                        </div>
                        <div className="landing-chef-card__body">
                            <h3>{card.name}</h3>
                            <p>{card.country}</p>
                            <Link to={card.to} className="landing-chef-card__link">
                                View recipes <ArrowIcon />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default FeaturedChefs;
