import React from 'react';
import './ImageLinkForm.css';
import Rank from '../Rank/Rank';


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        
            <div className='ma4'>
                <Rank />
                <p className='f3'>
                    {'This magic brain will detect faces in your picrtures. Git it try!'}
                </p>
                <div className='input__bg pa4 br3 shadow-3 flex'>
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
                <button className='ml1 pointer grow f4 w-30 ph3 pv2 link white bg-light-purple'
                onClick={onButtonSubmit}
                >Detect</button>
                </div>
            </div>
            
       
    );
}
export default ImageLinkForm;