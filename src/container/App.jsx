import React, { useLayoutEffect } from 'react';
import { Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom';
import HomeScreenContainer from "./HomeScreenContainer";
import FavoriteRecipesContainer from "./FavoriteRecipesContainer";
import ChefsContainer from "./ChefsContainer";
import AllRecipesContainer from "./AllRecipesContainer";
import RecipeDetailsContainer from "./RecipeDetailsContainer";
import WelcomeContainer from "./WelcomeContainer";
import ChefRecipesContainer from "./ChefRecipesContainer";
import LandingContainer from "./LandingContainer";
import SiteNavBar from "../components/SiteNavBar";

// Class components can't call useParams, so these pass the URL id in as a prop.
// `key` remounts the page when the id changes, so its data refetches.
const RecipeDetailsRoute = () => {
    const { id } = useParams();
    return <RecipeDetailsContainer key={id} recipeId={parseInt(id, 10)} />;
};

const ChefRecipesRoute = () => {
    const { chefId } = useParams();
    return <ChefRecipesContainer key={chefId} chefId={parseInt(chefId, 10)} />;
};

// Every page except home: the light nav bar on top, the page below it.
// (Home draws its own nav inside the banner.)
const PageLayout = () => (
    <>
        <SiteNavBar mode="page" />
        <Outlet />
    </>
);

// Start each new page at the top. (The router keeps the old scroll position
// otherwise.) A jump to a home-page section handles its own scrolling.
const ScrollToTop = () => {
    const { pathname, state } = useLocation();
    useLayoutEffect(() => {
        if (!state?.section) window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
    return null;
};

function App() {

  return (
    <div className="App">
        <ScrollToTop />
        <Routes>
            <Route path='/' element={<LandingContainer />} />
            <Route element={<PageLayout />}>
                <Route path='/signin' element={<HomeScreenContainer />} />
                <Route path='/welcome' element={<WelcomeContainer />} />
                <Route path='/favorites' element={<FavoriteRecipesContainer />} />
                <Route path='/chefs' element={<ChefsContainer />} />
                <Route path='/recipes' element={<AllRecipesContainer />} />
                <Route path='/recipes/:id' element={<RecipeDetailsRoute />} />
                <Route path='/recipes/chefs/:chefId' element={<ChefRecipesRoute />} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
