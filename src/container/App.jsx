import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import HomeScreenContainer from "./HomeScreenContainer";
import FavoriteRecipesContainer from "./FavoriteRecipesContainer";
import ChefsContainer from "./ChefsContainer";
import AllRecipesContainer from "./AllRecipesContainer";
import RecipeDetailsContainer from "./RecipeDetailsContainer";
import WelcomeContainer from "./WelcomeContainer";
import ChefRecipesContainer from "./ChefRecipesContainer";
import LandingContainer from "./LandingContainer";

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

function App() {

  return (
    <div className="App">
        <Routes>
            <Route path='/' element={<LandingContainer />} />
            <Route path='/signin' element={<HomeScreenContainer />} />
            <Route path='/welcome' element={<WelcomeContainer />} />
            <Route path='/favorites' element={<FavoriteRecipesContainer />} />
            <Route path='/chefs' element={<ChefsContainer />} />
            <Route path='/recipes' element={<AllRecipesContainer />} />
            <Route path='/recipes/:id' element={<RecipeDetailsRoute />} />
            <Route path='/recipes/chefs/:chefId' element={<ChefRecipesRoute />} />
        </Routes>
    </div>
  );
}

export default App;
