"use client";
import { useState } from 'react';

const ReadMore = ({ text, maxLength }) => {
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <div>
            <p className=' leading-8'>
                {isReadMore ? `${text.slice(0, maxLength)}...` : text}
                <span className='text-blue-950 font-extrabold cursor-pointer' onClick={toggleReadMore}>
                    {isReadMore ? '..more' : '..less'}
                </span>
            </p>
        </div>
    );
};

export default ReadMore;
