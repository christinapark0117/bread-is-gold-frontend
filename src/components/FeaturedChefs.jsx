import React, { useEffect, useState } from 'react';
import { apiUrl } from "../api";
import { Link } from 'react-router-dom';
import botturaPhoto from '../image/chefs/Massimo Bottura.webp';
import hummPhoto from '../image/chefs/Daniel Humm.jpg';
import colagrecoPhoto from '../image/chefs/Mauro Colagreco.jpg.avif';
import redzepiPhoto from '../image/chefs/René Redzepi.jpg';
import narisawaPhoto from '../image/chefs/Yoshihiro Narisawa.webp';
import allenoPhoto from '../image/chefs/Yannick Alleno.jpg';
import acurioPhoto from '../image/chefs/Gaston Acurio.jpg';
import alciatiPhoto from '../image/chefs/Ugo Alciati.jpg';
import tsumuraPhoto from '../image/chefs/Mitsuharu Tsumura.png';
import ducassePhoto from '../image/chefs/alain ducasse.webp';

// Every chef in the book, in carousel order. `lastName` matches the DB
// spelling (used to find the chef's id for the recipe link); `name` is how
// it's shown. Country isn't stored in the DB yet.
// `focus` is the object-position that keeps the face in the card crop and
// `zoom` enlarges photos where the chef stands farther from the camera.
// A chef without a photo shows their initials instead.
export const CHEFS = [
    { lastName: 'Bottura', name: 'Massimo Bottura', country: 'Italy', photo: botturaPhoto, focus: '50% 15%', zoom: 1 },
    { lastName: 'Humm', name: 'Daniel Humm', country: 'United States', photo: hummPhoto, focus: '45% 14%', zoom: 1.3 },
    { lastName: 'Collagreco', name: 'Mauro Colagreco', country: 'France', photo: colagrecoPhoto, focus: '50% 20%', zoom: 1 },
    { lastName: 'Redzepi', name: 'René Redzepi', country: 'Denmark', photo: redzepiPhoto, focus: '28% 40%', zoom: 1.15 },
    { lastName: 'Narisawa', name: 'Yoshihiro Narisawa', country: 'Japan', photo: narisawaPhoto, focus: '53% 16%', zoom: 1.3 },
    { lastName: 'Alleno', name: 'Yannick Alléno', country: 'France', photo: allenoPhoto, focus: '45% 18%', zoom: 1 },
    { lastName: 'Acurio', name: 'Gastón Acurio', country: 'Peru', photo: acurioPhoto, focus: '46% 15%', zoom: 1.5 },
    { lastName: 'Alciati', name: 'Ugo Alciati', country: 'Italy', photo: alciatiPhoto, focus: '47% 42%', zoom: 1.6 },
    { lastName: 'Tsumura', name: 'Mitsuharu Tsumura', country: 'Peru', photo: tsumuraPhoto, focus: '52% 25%', zoom: 1.15 },
    { lastName: 'Ducasse', name: 'Alain Ducasse', country: 'France', photo: ducassePhoto, focus: '48% 27%', zoom: 1.15 },
];

const initials = (name) => name.split(' ').map(part => part[0]).join('');

const ArrowIcon = () => (
    <svg aria-hidden="true" width="20" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M0 6h20M15 1l5 5-5 5" />
    </svg>
);

// `copy` is the second, identical set of cards that makes the loop seamless;
// it's hidden from screen readers and the keyboard so each chef counts once.
const ChefCard = ({ card, copy = false }) => (
    <article className={copy ? 'landing-chef-card landing-chef-card--copy' : 'landing-chef-card'} aria-hidden={copy || undefined}>
        <div className="landing-chef-card__photo">
            {card.photo ? (
                <img src={card.photo} alt={copy ? '' : `Chef ${card.name}`} style={{ objectPosition: card.focus, transformOrigin: card.focus, '--zoom': card.zoom }} />
            ) : (
                <span className="landing-chef-card__initials" aria-hidden="true">{initials(card.name)}</span>
            )}
        </div>
        <div className="landing-chef-card__body">
            <h3>{card.name}</h3>
            <p>{card.country}</p>
            <Link to={card.to} className="landing-chef-card__link" tabIndex={copy ? -1 : undefined}>
                View recipes <ArrowIcon />
            </Link>
        </div>
    </article>
);

const FeaturedChefs = ({ ref }) => {
    const [chefs, setChefs] = useState([]);

    useEffect(() => {
        fetch(apiUrl('/chefs'))
            .then(resp => resp.json())
            .then(setChefs)
            .catch(() => setChefs([]));
    }, []);

    const cards = CHEFS.map(featured => {
        const chef = chefs.find(c => c.last_name === featured.lastName);
        return {
            ...featured,
            to: chef ? `/recipes/chefs/${chef.id}` : '/chefs',
        };
    });

    return (
        <section id="featured-chefs" ref={ref} className="landing-chefs" aria-labelledby="featured-chefs-title">
            <h2 id="featured-chefs-title" className="landing-rule-title reveal">Featured Chefs</h2>
            {/* Cards drift continuously right-to-left and pause on hover/focus.
                With reduced motion it becomes a row you scroll sideways. */}
            <div className="landing-chefs__carousel reveal" style={{ '--reveal-delay': '0.1s', '--chef-count': cards.length }}>
                <div className="landing-chefs__track">
                    {cards.map(card => <ChefCard card={card} key={card.lastName} />)}
                    {cards.map(card => <ChefCard card={card} copy key={`${card.lastName}-copy`} />)}
                </div>
            </div>
        </section>
    );
};

export default FeaturedChefs;
