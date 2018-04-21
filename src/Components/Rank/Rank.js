import React from 'react';

const Rank = ({name, entries}) => {
    return (    
       <div className='ma4'>
           <div className='white f3 tl-ns '>
               {`${name}, your current entry count is...`}
           </div>
           <div className='white f1 tl-ns '>
               {entries}
           </div>
       </div>
    );
}
export default Rank;