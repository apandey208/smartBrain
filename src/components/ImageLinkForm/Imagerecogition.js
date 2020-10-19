import React from 'react';
import './Imagerecoginition.css';



const Imagelinkform = ({ onInputChange, onSubmit }) => {
    return(
        <div >
            <p className='f3'>
                {'This is Magic! It detects faces'}
            </p>
            <div className='center'>
            <div className='form pa4 br4 shadow-5'>
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
                <button className='w-30 grow f4 link ph3 pv2 dib black bg-light-purple' onClick={onSubmit}>Face It</button>
            </div>
        </div>
        </div>

    );
}                                                           

export default Imagelinkform;