import { useState } from 'react';

export const useButton = () => {
  const [isPressed, setIsPressed] = useState(false);

  return {
    isPressed,
    setIsPressed,
  };
};
