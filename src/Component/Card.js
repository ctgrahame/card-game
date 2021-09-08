import React from 'react';
import '../css/main.css';

function Card (props) {

    return(
        
        <button className='card' value={props.value} id={props.id} onClick={props.onClick}>
            { props.openedCards? props.value : ''}
        </button>
        
    )
}

export default Card;