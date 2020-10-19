import React from 'react';
import Tilt from 'react-tilt';
import Brain from './Brain.png';
import './Logo.css';

const Logo = () => {
    return(
        <div className='ma4 mt0'>
        <Tilt className="Tilt br2 shadow-2 " options={{ max : 55 }} style={{ height: 130, width: 150 }} >
            <div className="Tilt-inner pa2"><img  src={Brain} alt='LOGO'></img> </div>
        </Tilt>
        </div>
    );
}

export default Logo;