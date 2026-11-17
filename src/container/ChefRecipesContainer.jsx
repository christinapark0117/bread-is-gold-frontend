import React, {Component} from 'react';
import { apiUrl } from "../api";
import ChefRecipes from "../components/ChefRecipes";
import '../ChefRecipesContainer.css'

class ChefRecipesContainer extends Component {

    constructor(){
        super()

        this.state = {
            allChefs: [],
            currentChef: {}
        }
    }

    componentDidMount() {
        fetch(apiUrl('/chefs'))
            .then(resp => resp.json())
            .then(chefArr => this.setState({
                allChefs: chefArr
            }, () => this.renderChefRecipe()))
    }

    renderChefRecipe = () => {
        this.setState({
            currentChef: this.state.allChefs.find(chef => chef.id === this.props.chefId)
        })
    }

    render() {
        return (
            <div>
                <div className='chef-recipes-container-div'>
                    <ChefRecipes currentChef={this.state.currentChef} allChef={this.state.allChefs}/>
                </div>
            </div>
        );
    }
}

export default ChefRecipesContainer;
