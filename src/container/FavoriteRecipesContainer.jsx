import React, {Component} from 'react';
import { apiUrl } from "../api";
import FavoriteRecipeList from "../components/FavoriteRecipeList";
import '../FavoriteRecipesContainer.css'
import SignOut from "../components/SignOut";

class FavoriteRecipesContainer extends Component {

    constructor(){

        super()

        this.state = {
            userFavorites: [],
            recipeNames: []
        }
    }

    componentDidMount() {
        let favorites = [];
        fetch(apiUrl('/favorites'))
            .then(resp => resp.json())
            .then(userData => {
                // TODO: Filter based on user passed in
                favorites = userData.filter(entry => entry.user.username ==='cpark')
                    .map(entry => entry)
                this.setState({
                    userFavorites: favorites
                })
            })
    }


    render() {
        return (

            <div>
                <div className='favorite-recipes-container-div'>
                    <div>
                        <h3 className='favorite-recipes-header'>My Favorite Recipes</h3>
                    </div>
                    <FavoriteRecipeList userFavorites={this.state.userFavorites}/>
                </div>
                <SignOut/>
            </div>

        );
    }
}

export default FavoriteRecipesContainer;
