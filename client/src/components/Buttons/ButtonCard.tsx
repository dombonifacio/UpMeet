import React from 'react'

interface ButtonProps {
  text: string;
}

const ButtonCard= ({text}: ButtonProps) => {
  return (
    <div>
      <button className="bg-lavender p-2 px-3 text-xs md:text-sm md:p-2 md:px-4 rounded-md hover:bg-indigo-800 duration-75 font-bold">
       {text}
      </button>
    </div>
  );
}

export default ButtonCard;
