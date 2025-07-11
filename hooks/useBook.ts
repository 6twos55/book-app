import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

export const useBook = () => {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("Can't use useBook hook outside a BookProveder component");
  }

  return context;
};
