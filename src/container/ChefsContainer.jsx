import React, {Component} from 'react';
import { apiUrl } from "../api";
import ChefCards from "../components/ChefCards";
import SignOut from "../components/SignOut";
import '../SignOut.css'

class ChefsContainer extends Component {

    constructor(){
        super();

        this.state = {
            allChefs: []
        }
    }

    componentDidMount() {
        fetch(apiUrl('/chefs'))
            .then(resp => resp.json())
            .then(chefArr => this.setState({
                allChefs: chefArr
            }))
    }

    render() {
        return (
            <div className='chefs-container'>
                <div className='chef-card'>
                    {this.state.allChefs.map(chef => <ChefCards key={chef.id} {...chef}/>)}
                </div>
                <SignOut/>
            </div>
        );
    }
}

export default ChefsContainer;
