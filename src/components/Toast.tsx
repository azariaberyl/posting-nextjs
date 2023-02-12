import React, { useState } from 'react';

function Toast({ message }: { message: string }) {
  return <div className='fixed bottom-6 right-5 p-2 bg-zinc-700 text-white rounded-lg shadow-lg'>{message}</div>;
}

export default Toast;
