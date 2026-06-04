import { useEffect, useState } from "react";

/**
 * Retorna uma versão "atrasada" do valor: só atualiza após `delay` ms
 * sem mudanças. Útil para evitar disparar buscas a cada tecla digitada.
 */
export function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
