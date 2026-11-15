import React from 'react'
import HomeScreenHeader from "../components/HomeScreenHeader";
import HomeScreenLoginForm from "../components/HomeScreenLoginForm";
import HomeScreenCreateAccountForm from "../components/HomeScreenCreateAccountForm";
import '../HomeScreenContainer.css'

class HomeScreenContainer extends React.Component {

    createAccount = (accountInformation) => {
        console.log(accountInformation)
    }

    confirmLogin = (credentials) => {
        console.log(credentials)
    }

    render() {
        return(
            <div className="home-screen">
                <HomeScreenHeader/>
                <div className='everything-below-header'>
                <p className='slogan'> Chef's Plate's at Your<br/>Dining Table</p>
                <HomeScreenLoginForm confirmLogin={this.confirmLogin}/>
                <HomeScreenCreateAccountForm createAccount={this.createAccount} />
                </div>
            </div>
        )
    }

}

export default HomeScreenContainer