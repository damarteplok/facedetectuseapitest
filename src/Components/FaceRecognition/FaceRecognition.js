import React from 'react';
import './FaceRecognition.css';



const FaceRecognition = ({imageUrl, box}) => {

    var indents = [];
    for (var i = 0; i < box.length; i++) {
    indents.push(<div className='bounding-box'
                    style={{top: box[i].topRow, 
                            right: box[i].rightCol,
                            left: box[i].leftCol,
                            bottom: box[i].bottomRow}}
                    key={i}>
                </div>);
    }
    
    return (
        
            <div className='flex justify-center'>
                <div className='absolute'>
                <img id='inputimage' src={imageUrl} className='mw-100' alt='' />
                {indents}
                {/* <div className='bounding-box' 
                style={{top: box.topRow, 
                right: box.rightCol,
                left: box.leftCol,
                bottom: box.bottomRow}}></div> */}
                </div>
                
            </div>
            
       
    );
}
export default FaceRecognition;