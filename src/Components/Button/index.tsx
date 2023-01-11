import React from 'react';

const Button = (props: any) => {
    return (
        <div onClick={props.handle} className={`text-[16px] font-medium w-[100px] text-center rounded-md border-2 cursor-pointer ${props.active ? 'bg-green text-white border-green' : 'border-gray-2'}`}>
            {props.text}
        </div>
    )
}

export default Button;