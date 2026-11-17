// Extra details for each recipe that the database doesn't store (yet).
// Keyed by the recipe's DB `recipe_name`, trimmed (the DB names are ALL CAPS).
//
// - title:    how the name is shown (the DB spelling is kept as the key)
// - category: one of the CATEGORIES ids below; drives the filter tabs
// - photo:    a file name inside src/image/recipes/. Leave it out and the
//             card shows a placeholder until you add one.
// - focus:    optional, which part of the photo to keep in the crop, as a
//             CSS position ('50% 50%' is the center; '40% 60%' is left of
//             center and lower). Also the point the zoom grows from.
// - zoom:     optional, enlarges the photo inside its frame (1.5 = 150%)
// - minutes:  total time. Leave it out and the card just doesn't show it.
// - blurb:    one or two lines, used when the recipe is featured at the top
//
// To add a photo: drop the file into src/image/recipes/ and put its exact
// file name in `photo`.

export const CATEGORIES = [
    { id: 'starter', label: 'Appetizers' },
    { id: 'soup', label: 'Soups' },
    { id: 'main', label: 'Mains' },
    { id: 'side', label: 'Sides & Sauces' },
    { id: 'dessert', label: 'Desserts' },
];

export const RECIPE_META = {
    'STRAWBERRY GAZPACHO': {
        title: 'Strawberry Gazpacho',
        category: 'soup',
        photo: 'Daniel Humm - Strawberry Gazpachonomad.webp',
        blurb: 'Day-old bread and ripe strawberries, blended into a bright, chilled soup for the height of summer.',
    },
    'ZUCCHINI AND BEEF GRATIN': {
        title: 'Zucchini and Beef Gratin',
        category: 'main',
        photo: 'Daniel Humm - Zucchini Beef Gratin.jpg',
    },
    'BURNT LIME SOUP': {
        title: 'Burnt Lime Soup',
        category: 'soup',
        photo: 'Rene Redzepi - Burnt Lime Soup.webp',
        blurb: 'Whatever root vegetables are on hand, lifted by the smoky bitterness of charred lime.',
    },
    'PASTA WITH POPCORN PESTO': {
        title: 'Pasta with Popcorn Pesto',
        category: 'main',
        photo: 'Rene Redzepi - Pasta with Popcorn Pesto.jpg',
        blurb: 'Popcorn brings a toasty crunch to a pesto made from what is already in the pantry.',
    },
    'CREAM OF MIXED GRAINS WITH PUFFED RICE AND GOAT MILK ROYALE': {
        title: 'Cream of Mixed Grains with Puffed Rice and Goat Milk Royale',
        photo: 'Alain Ducasse - Cream of Mixed Grains with Puffed Rice and Goat Milk Royale.jpg',
        category: 'starter',
    },
    'SPICED MEATBALLS WITH SMOKED EGGPLANT, TOASTED CHICKPEAS, AND EGGPLANT CONDIMENT': {
        title: 'Spiced Meatballs with Smoked Eggplant, Toasted Chickpeas, and Eggplant Condiment',
        photo: 'Alain Ducasse - Spiced Meatballs.jpg',
        category: 'main',
    },
    "CHEF MASSIMO BOTTURA'S ITALIAN SALSA VERDE": {
        title: 'Italian Salsa Verde',
        photo: 'Massimo Bottura - Italian Salsa Verde.jpg',
        focus: '42% 57%', // the bowl
        zoom: 1.35,
        category: 'side',
    },
    'VEGETARIAN MOQUECA': {
        title: 'Vegetarian Moqueca',
        photo: 'Massimo Bottura - Vegetarian Moqueca.jpg',
        category: 'main',
    },
    'GREEN ASPARAGUS, YOGURT SAUCE WITH MENTON CITRUS AND CHICKWEED': {
        title: 'Green Asparagus, Yogurt Sauce with Menton Citrus and Chickweed',
        photo: 'Mauro Colagreco - Green Asparagus.jpg',
        category: 'starter',
    },
    'SEA BASS, CELERIAC PURÉE, WILD SIRREL AND SMOKED SAUCE WITH SHELLFISH': {
        title: 'Sea Bass, Celeriac Purée, Wild Sorrel and Smoked Shellfish Sauce',
        photo: 'Mauro Colagreco - Sea Bass.jpg',
        category: 'main',
    },
    'HIDA BEEF': {
        title: 'Hida Beef',
        photo: 'Yoshihiro Narisawa - Hida Beef.jpg',
        category: 'main',
    },
    'LANDSCAPE OF FEBRUARY SATOYAMA': {
        title: 'Landscape of February Satoyama',
        photo: 'Yoshihiro Narisawa - Landscape of February Satoyama.jpg',
        category: 'main',
    },
    'CRUNCHY BISCUITS WITH SARDINE CREAM & LEMON': {
        title: 'Crunchy Biscuits with Sardine Cream & Lemon',
        photo: 'Yannick Alleno - Crunchy Biscuits with Sardine Cream.jpg',
        category: 'starter',
    },
    'SNAILS BAKED IN PARIS MUSHROOM CAP WITH PARSLEY AND GARLIC BUTTER': {
        title: 'Snails Baked in Mushroom Caps with Parsley and Garlic Butter',
        photo: 'Yannick Alleno - Snails in Mushroom Caps.jpg',
        category: 'starter',
    },
    'QUINOA CHAUFA (chaufa de quinoa)': {
        title: 'Quinoa Chaufa',
        photo: 'Gaston Acurio - Quinoa Chaufa.jpg',
        category: 'main',
    },
    'CLASSIC CEVICHE (ceviche clásico)': {
        title: 'Classic Ceviche',
        photo: 'Gaston Acurio - Classic Ceviche.jpg',
        category: 'starter',
        blurb: 'White fish cured in a quick bath of lemon juice, with chile, red onion, corn and sweet potato.',
    },
    'LEMON-SCENTED RICE WITH SOYA CARAMELISED EEL': {
        title: 'Lemon-Scented Rice with Soy-Caramelised Eel',
        photo: 'Ugo Alciati - Lemon-Scented Rice with Eel.jpg',
        category: 'main',
    },
    'ASADO NITSUKE': {
        title: 'Asado Nitsuke',
        photo: 'Mitsuharu Tsumura - Asado Nitsuke.jpg',
        category: 'main',
    },
    'SAUTÉED BEANS': {
        title: 'Sautéed Beans',
        photo: 'Mitsuharu Tsumura - Sauteed Beans.jpg',
        category: 'side',
    },
};

// "Featured this week": one appetizer, one main and one dessert, in that
// order. `recipe` is the DB recipe_name (same as the keys above); a slot
// with no recipe is skipped until one is filled in.
export const FEATURED = [
    { course: 'Appetizer', recipe: 'CLASSIC CEVICHE (ceviche clásico)' },
    { course: 'Main', recipe: 'PASTA WITH POPCORN PESTO' },
    { course: 'Dessert', recipe: null },
];

// Every photo in src/image/recipes/, by file name.
const PHOTOS = import.meta.glob('../image/recipes/*', { eager: true, import: 'default' });
const photoUrl = (fileName) => (fileName ? PHOTOS[`../image/recipes/${fileName}`] : undefined);

// "PASTA WITH POPCORN PESTO" -> "Pasta with Popcorn Pesto", for any recipe
// that has no `title` above.
const SMALL_WORDS = new Set(['a', 'an', 'and', 'as', 'at', 'de', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with']);
const titleCase = (name) => name.toLowerCase().split(' ').map((word, i) =>
    (i > 0 && SMALL_WORDS.has(word) ? word : word.charAt(0).toUpperCase() + word.slice(1))).join(' ');

// DB recipe + its extra details, ready for the page.
export const describeRecipe = (recipe) => {
    const key = (recipe.recipe_name || '').trim();
    const meta = RECIPE_META[key] || {};
    return {
        id: recipe.id,
        key,
        chefId: recipe.chef_id,
        title: meta.title || titleCase(key),
        category: meta.category,
        photo: photoUrl(meta.photo),
        photoStyle: (meta.focus || meta.zoom)
            ? { objectPosition: meta.focus, transformOrigin: meta.focus, '--zoom': meta.zoom }
            : undefined,
        minutes: meta.minutes,
        blurb: meta.blurb,
    };
};
