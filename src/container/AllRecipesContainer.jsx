import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../api';
import useReveal from '../hooks/useReveal';
import { CHEFS } from '../components/FeaturedChefs';
import { CATEGORIES, FEATURED, describeRecipe } from '../data/recipeMeta';
import '../AllRecipesContainer.css';

const PAGE_SIZE = 9;
const SLIDE_SECONDS = 7;

const SORTS = [
    { id: 'az', label: 'A – Z' },
    { id: 'za', label: 'Z – A' },
    { id: 'chef', label: 'Chef' },
];

const categoryLabel = (id) => CATEGORIES.find(c => c.id === id)?.label;

/* ---------- Icons ---------- */

const ArrowIcon = ({ flip = false }) => (
    <svg aria-hidden="true" width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.4"
        style={flip ? { transform: 'scaleX(-1)' } : undefined}>
        <path d="M1 6h20M16 1l5 5-5 5" />
    </svg>
);

const HeartIcon = ({ filled }) => (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
    </svg>
);

const ClockIcon = () => (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="8" cy="8" r="6.5" /><path d="M8 4.5V8l2.5 1.5" />
    </svg>
);

const LeafIcon = () => (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M3 13C3 7 7 3 14 3c0 7-4 11-10 11" /><path d="M3 13l6-6" />
    </svg>
);

const ChevronIcon = () => (
    <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 3.5l3 3 3-3" /></svg>
);

// Shown where a recipe has no photo yet.
const PhotoPlaceholder = () => (
    <div className="recipe-photo-empty">
        <svg aria-hidden="true" width="56" height="40" viewBox="0 0 56 40" fill="none" stroke="currentColor" strokeWidth="1.1">
            <ellipse cx="28" cy="22" rx="17" ry="12" /><ellipse cx="28" cy="22" rx="10" ry="6.5" />
            <path d="M4 6v10a3 3 0 0 0 3 3v17M7 6v8M10 6v10a3 3 0 0 1-3 3" />
            <path d="M50 6c-3 1.5-4 6-4 11h4v19" />
        </svg>
        <span>Photo coming soon</span>
    </div>
);

/* ---------- Featured carousel ---------- */

const FeaturedCarousel = ({ slides }) => {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const count = slides.length;

    // Advance on a timer; hovering or focusing the carousel holds it still,
    // and people who ask their OS for less motion only move it by hand.
    useEffect(() => {
        if (paused || count < 2) return undefined;
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
        const timer = setTimeout(() => setIndex(i => (i + 1) % count), SLIDE_SECONDS * 1000);
        return () => clearTimeout(timer);
    }, [index, paused, count]);

    if (!count) return null;
    const go = (step) => setIndex(i => (i + step + count) % count);

    return (
        <section
            className="recipes-featured"
            aria-roledescription="carousel"
            aria-label="Featured recipes"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            <div className="recipes-featured__slides">
                {slides.map((slide, i) => {
                    const active = i === index;
                    return (
                        <article
                            key={slide.id}
                            className={`recipes-slide${active ? ' is-active' : ''}`}
                            aria-roledescription="slide"
                            aria-label={`${i + 1} of ${count}`}
                            aria-hidden={!active}
                            inert={!active}
                        >
                            <div className="recipes-slide__photo">
                                {slide.photo ? <img src={slide.photo} alt={slide.title} style={slide.photoStyle} /> : <PhotoPlaceholder />}
                            </div>
                            <div className="recipes-slide__text">
                                <p className="recipes-eyebrow">{slide.course}</p>
                                <h2 className="recipes-slide__title">{slide.title}</h2>
                                {slide.chef && <p className="recipes-slide__chef"><em>by</em> {slide.chef}</p>}
                                {slide.blurb && <p className="recipes-slide__blurb">{slide.blurb}</p>}
                                <Link to={`/recipes/${slide.id}`} className="recipes-text-link">
                                    Read recipe <ArrowIcon />
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>

            {count > 1 && (
                <>
                    <button type="button" className="recipes-round-button recipes-featured__prev" onClick={() => go(-1)} aria-label="Previous featured recipe">
                        <ArrowIcon flip />
                    </button>
                    <button type="button" className="recipes-round-button recipes-featured__next" onClick={() => go(1)} aria-label="Next featured recipe">
                        <ArrowIcon />
                    </button>
                    <div className="recipes-featured__dots">
                        {slides.map((slide, i) => (
                            <button
                                type="button"
                                key={slide.id}
                                className={i === index ? 'is-active' : undefined}
                                aria-label={`Show ${slide.title}`}
                                aria-current={i === index || undefined}
                                onClick={() => setIndex(i)}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

/* ---------- Recipe card ---------- */

const RecipeCard = ({ recipe, column, liked, onToggleLike }) => (
    <li className="recipe-card reveal" style={{ '--reveal-delay': `${column * 0.08}s` }}>
        <Link to={`/recipes/${recipe.id}`} className="recipe-card__link">
            <div className="recipe-card__photo">
                {recipe.photo ? <img src={recipe.photo} alt="" loading="lazy" style={recipe.photoStyle} /> : <PhotoPlaceholder />}
            </div>
            <div className="recipe-card__body">
                <h3 className="recipe-card__title">{recipe.title}</h3>
                {recipe.chef && <p className="recipe-card__chef">by {recipe.chef}</p>}
                <p className="recipe-card__meta">
                    {recipe.minutes && <span><ClockIcon /> {recipe.minutes} min</span>}
                    {recipe.category && <span><LeafIcon /> {categoryLabel(recipe.category)}</span>}
                </p>
            </div>
        </Link>
        <button
            type="button"
            className={`recipe-card__like${liked ? ' is-liked' : ''}`}
            aria-pressed={liked}
            aria-label={liked ? `Remove ${recipe.title} from favorites` : `Save ${recipe.title} to favorites`}
            onClick={() => onToggleLike(recipe.id)}
        >
            <HeartIcon filled={liked} />
        </button>
    </li>
);

const SkeletonCard = () => (
    <li className="recipe-card recipe-card--skeleton" aria-hidden="true">
        <div className="recipe-card__photo" />
        <div className="recipe-card__body"><span /><span /><span /></div>
    </li>
);

/* ---------- Page ---------- */

const AllRecipesContainer = () => {
    const [recipes, setRecipes] = useState([]);
    const [chefs, setChefs] = useState([]);
    const [status, setStatus] = useState('loading'); // loading | ready | error
    const [category, setCategory] = useState('all');
    const [sort, setSort] = useState('az');
    const [page, setPage] = useState(1);
    // Hearts are only kept on this page for now; saving them waits for login.
    const [liked, setLiked] = useState(() => new Set());
    const toolbarRef = useRef(null);

    useEffect(() => {
        Promise.all([
            fetch(apiUrl('/recipes')).then(resp => resp.json()),
            fetch(apiUrl('/chefs')).then(resp => resp.json()),
        ])
            .then(([recipeList, chefList]) => {
                setRecipes(Array.isArray(recipeList) ? recipeList : []);
                setChefs(Array.isArray(chefList) ? chefList : []);
                setStatus('ready');
            })
            .catch(() => setStatus('error'));
    }, []);

    // DB rows + display details + the chef's name as the site spells it.
    const allRecipes = useMemo(() => {
        const chefName = (id) => {
            const chef = chefs.find(c => c.id === id);
            if (!chef) return undefined;
            return CHEFS.find(c => c.lastName === chef.last_name)?.name || `${chef.first_name} ${chef.last_name}`;
        };
        return recipes.map(r => {
            const recipe = describeRecipe(r);
            return { ...recipe, chef: chefName(recipe.chefId) };
        });
    }, [recipes, chefs]);

    const featured = useMemo(
        () => FEATURED
            .map(slot => {
                const recipe = allRecipes.find(r => r.key === slot.recipe);
                return recipe && { ...recipe, course: slot.course };
            })
            .filter(Boolean),
        [allRecipes],
    );

    // Only offer tabs that have at least one recipe.
    const tabs = CATEGORIES.filter(c => allRecipes.some(r => r.category === c.id));

    const visible = useMemo(() => {
        const list = category === 'all' ? [...allRecipes] : allRecipes.filter(r => r.category === category);
        const byTitle = (a, b) => a.title.localeCompare(b.title);
        if (sort === 'za') list.sort((a, b) => byTitle(b, a));
        else if (sort === 'chef') list.sort((a, b) => (a.chef || '').localeCompare(b.chef || '') || byTitle(a, b));
        else list.sort(byTitle);
        return list;
    }, [allRecipes, category, sort]);

    const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const pageItems = visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    // Re-run the fade-up for cards that appear after loading, filtering or paging.
    const revealRef = useReveal([status, category, sort, currentPage]);

    const chooseCategory = (id) => { setCategory(id); setPage(1); };
    const chooseSort = (event) => { setSort(event.target.value); setPage(1); };
    const goToPage = (n) => {
        setPage(n);
        toolbarRef.current?.scrollIntoView({ block: 'start' });
    };
    const toggleLike = (id) => setLiked(prev => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id); else next.add(id);
        return next;
    });

    return (
        <div className="recipes-page" ref={revealRef}>
            <header className="recipes-intro">
                <div className="recipes-intro__title">
                    <p className="recipes-eyebrow">The Recipe Collection</p>
                    <h1>Recipes</h1>
                </div>
                <span className="recipes-intro__rule" aria-hidden="true" />
                <p className="recipes-intro__tagline">
                    Everyday ingredients, <br />reimagined by the world's <br />great chefs.
                </p>
                <p className="recipes-intro__featured">Featured<br />this week</p>
            </header>

            {status === 'ready' && <FeaturedCarousel slides={featured} />}

            <div className="recipes-toolbar" ref={toolbarRef}>
                <button
                    type="button"
                    className={`recipes-all-pill${category === 'all' ? ' is-active' : ''}`}
                    onClick={() => chooseCategory('all')}
                    aria-pressed={category === 'all'}
                >
                    All Recipes <span>({allRecipes.length})</span>
                </button>
                <span className="recipes-toolbar__divider" aria-hidden="true" />
                <div className="recipes-tabs" role="group" aria-label="Filter by course">
                    {tabs.map(tab => (
                        <button
                            type="button"
                            key={tab.id}
                            className={category === tab.id ? 'is-active' : undefined}
                            aria-pressed={category === tab.id}
                            onClick={() => chooseCategory(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <span className="recipes-toolbar__divider" aria-hidden="true" />
                <label className="recipes-sort">
                    <span>Sort by</span>
                    <select value={sort} onChange={chooseSort}>
                        {SORTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                    <ChevronIcon />
                </label>
            </div>

            {status === 'error' && (
                <p className="recipes-message">We couldn't load the recipes right now. Please try again in a moment.</p>
            )}

            <ul className="recipes-grid" key={`${category}-${sort}-${currentPage}`} aria-busy={status === 'loading'}>
                {status === 'loading' && Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}
                {status === 'ready' && pageItems.map((recipe, i) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        column={i % 3}
                        liked={liked.has(recipe.id)}
                        onToggleLike={toggleLike}
                    />
                ))}
            </ul>

            {status === 'ready' && pageCount > 1 && (
                <nav className="recipes-pagination" aria-label="Pages">
                    <button type="button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page">
                        <ArrowIcon flip />
                    </button>
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map(n => (
                        <button
                            type="button"
                            key={n}
                            className={n === currentPage ? 'is-active' : undefined}
                            aria-current={n === currentPage ? 'page' : undefined}
                            onClick={() => goToPage(n)}
                        >
                            {n}
                        </button>
                    ))}
                    <button type="button" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === pageCount} aria-label="Next page">
                        <ArrowIcon />
                    </button>
                </nav>
            )}
        </div>
    );
};

export default AllRecipesContainer;
