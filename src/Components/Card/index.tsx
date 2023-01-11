import React from 'react';

const Card = (props: any) => {
    return (
        <div onClick={props.handle} className='cursor-pointer flex justify-between border-2 border-gray-2 rounded-full px-2 '>
            <label className={props.card.isCompleted? 'cursor-pointer text-gray-2 whitespace-nowrap overflow-hidden w-full': 'cursor-pointer text-gray-1 whitespace-nowrap overflow-hidden w-full'}>{props.card.text}</label>
            <div className={`h-4 w-4 rounded-full border border-gray-2 my-auto ${props.card.isCompleted? 'bg-green': ''}`}/>
        </div>
    )
}

export default Card;