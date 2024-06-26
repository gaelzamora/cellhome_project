import { useState, useEffect, useRef } from 'react';

type UseAnimatedPlaceholderReturn = {
  onFocus: () => void;
  onBlur: () => void;
  onInput: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
};

const useAnimatedPlaceholder = (): UseAnimatedPlaceholderReturn => {
  const [onInput, setOnInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setOnInput(true);
  };

  const handleBlur = () => {
    if (inputRef.current?.value === '') {
      setOnInput(false);
    }
  };

  useEffect(() => {
    if (inputRef.current?.value !== '') setOnInput(true)
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        handleBlur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return { onFocus: handleFocus, onBlur: handleBlur, onInput, inputRef };
};

export default useAnimatedPlaceholder;