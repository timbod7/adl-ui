
import {useState} from 'react'

export interface SelectState {
  current: number | null,
  active: boolean,
  choices: string[],
  onClick(): void;
  onChoice(i: number | null): void;
}

export function useSelectState(initial: number, choices: string[],): SelectState {
  const [active, setActive] = useState(false);
  const [current, setCurrent] = useState(initial);
  
  function onClick() {
    setActive( v => !v );
  }
  
  function onChoice(i:number) {
     setActive(false);
     setCurrent(i);
  }
  return {
    current,
    choices,
    active,
    onClick,
    onChoice,
  }
}

