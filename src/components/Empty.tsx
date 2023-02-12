import React from 'react';

function Empty(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...att } = props;

  return (
    <div {...att} className={`flex justify-center items-center w-full ${className}`}>
      <p className='text-gray-400 font-semibold'>Nothing to show</p>
    </div>
  );
}

export default Empty;
