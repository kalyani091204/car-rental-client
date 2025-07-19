import React from 'react';

const Title = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-black">{title}</h2>
      <p className="text-gray-500 mt-2 max-w-xl">{subTitle}</p>
    </div>
  );
};

export default Title;
