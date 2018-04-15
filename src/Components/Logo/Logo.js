import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
import Brain from './Logo.png';

const Logo = () => {
    return (
        <div className='flex justify-center'>
            <Tilt className="Tilt flex items-center justify-center br2 shadow-2" options={{ max : 55 }} style={{  width: 150 }} >
                <div className="Tilt-inner pa3"><img src={Brain} alt="Logo"/> </div>
            </Tilt>
        </div>
            
       
    );
}
export default Logo;