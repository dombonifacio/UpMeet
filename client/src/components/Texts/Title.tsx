import React from "react";

interface IText {
  text: String;
}

const Title = ({ text }: IText) => {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl text-light font-bold mb-1 md:my-2 ">
        {text}
      </h1>
      <div className="bg-lavender w-[13%] h-2"></div>
    </div>
  );
};

export default Title;
