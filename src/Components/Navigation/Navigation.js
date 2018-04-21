import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    
        if(isSignedIn){
        return(
            <nav className='flex justify-end'>
                <p onClick={ () => onRouteChange('signout') } className='f3 link hover-hot-pink dim black underline pa3 pointer'>Sign Out</p>
            </nav>
        );
        } else {
        return (
            <nav className='flex justify-end'>
                <p onClick={ () => onRouteChange('signin') } className='f3 link hover-light-purple dim black underline pa3 pointer'>Sign in</p>
                <p onClick={ () => onRouteChange('register') } className='f3 link hover-gold dim black underline pa3 pointer'>Register</p>
            </nav>     
        );
        }
        
    
}
export default Navigation;