import React, { useEffect, useState } from 'react';
import { apiUrl } from "../api";
import { Link } from 'react-router-dom';
import botturaPhoto from '../image/chefs/Massimo Bottura.webp';
import hummPhoto from '../image/chefs/Daniel Humm.jpg';
import colagrecoPhoto from '../image/chefs/Mauro Colagreco.jpg.avif';

// Who to feature on the home page, where they cook, and their portrait.
// `focus` is the object-position that keeps each face in the 3:2 card crop,
// `zoom` enlarges photos where the chef stands farther from the camera.
// Chef ids (for the recipe links) come from the API; lastName matches the DB
// spelling. Country isn't stored in the DB yet.
const FEATURED = [
    { lastName: 'Bottura', name: 'Massimo Bottura', country: 'Italy', photo: botturaPhoto, focus: '50% 15%', zoom: 1 },
    { lastName: 'Humm', name: 'Daniel Humm', country: 'United States', photo: hummPhoto, focus: '45% 14%', zoom: 1.3 },
    { lastName: 'Collagreco', name: 'Mauro Colagreco', country: 'France', photo: colagrecoPhoto, focus: '50% 20%', zoom: 1 },
];

const ArrowIcon = () => (
    <svg aria-hidden="true" width="20" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M0 6h20M15 1l5 5-5 5" />
    </svg>
);

const FeaturedChefs = () => {
    const [chefs, setChefs] = useState([]);

    useEffect(() => {
        fetch(apiUrl('/chefs'))
            .then(resp => resp.json())
            .then(setChefs)
            .catch(() => setChefs([]));
    }, []);

    const cards = FEATURED.map(featured => {
        const chef = chefs.find(c => c.last_name === featured.lastName);
        return {
            ...featured,
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
                            <img src={card.photo} alt={`Chef ${card.name}`} style={{ objectPosition: card.focus, transform: `scale(${card.zoom})`, transformOrigin: card.focus }} />
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
