import React from "react";

interface ICouterContextProps {
  count: number;
  handleDecrement: () => void;
  handleIncrement: () => void;
}

const CounterContext = React.createContext<ICouterContextProps | undefined>(
  undefined
);

interface IProps {
  children: React.ReactNode;
  value: ICouterContextProps;
}

function CounterProvider({ children, value }: IProps) {
  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

function useCounterContext() {
  const context = React.useContext(CounterContext);
  if (context === undefined) {
    throw new Error("useCounterContext must be used within a CounterProvider");
  }
  return context;
}

export { CounterProvider, useCounterContext };
