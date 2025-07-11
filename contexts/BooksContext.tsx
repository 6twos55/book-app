import { createContext, ReactNode, useEffect, useState } from "react";
import { client, databases } from "../lib/appwrite";
import { ID, Models, Permission, Query, Role } from "appwrite";
import { useUser } from "../hooks/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

interface IBook {
  title: string;
  author: string;
  description: string;
}

interface BookContextProps {
  books: Models.Document[];
  getBooks: () => Promise<void>;
  getBookById: (id: string) => Promise<Models.Document | undefined>;
  createBook: (data: IBook) => Promise<void>;
  updateBook: (data: IBook, id: string) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
}

interface BooksProviderProps {
  children: ReactNode;
}

const DATABASE_ID = "686e37f10000c0181a88";
const COLLECTION_ID = "686e3811001f21f2f28b";

export const BooksContext = createContext<BookContextProps | null>(null);

export const BooksProvider = ({ children }: BooksProviderProps) => {
  const [books, setBooks] = useState<Models.Document[]>([]);
  const { user } = useUser();

  const getBooks = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("userId", user?.$id!)]
      );

      setBooks(response.documents);

      await AsyncStorage.setItem(
        "bookList",
        JSON.stringify(response.documents)
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const getBookById = async (id: string) => {
    const localBooks = await AsyncStorage.getItem("bookList");
    const state = await NetInfo.fetch();

    try {
      if (!state.isConnected && localBooks) {
        return JSON.parse(localBooks).find(
          (book: Models.Document) => book.$id === id
        );
      }

      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const createBook = async (data: IBook) => {
    const state = await NetInfo.fetch();

    if (!state.isConnected) {
      throw new Error("Cannot create book while offline");
    }

    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        { ...data, userId: user?.$id },
        [
          Permission.read(Role.user(user?.$id!)),
          Permission.update(Role.user(user?.$id!)),
          Permission.delete(Role.user(user?.$id!)),
        ]
      );

      setBooks((prevBooks) => [...prevBooks, response]);
      const updatedLocalBooks = books;
      await AsyncStorage.setItem("bookList", JSON.stringify(updatedLocalBooks));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const updateBook = async (data: IBook, id: string) => {
    const state = await NetInfo.fetch();

    if (!state.isConnected) {
      throw new Error("Cannot update book while offline");
    }

    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const deleteBook = async (id: string) => {
    const state = await NetInfo.fetch();

    if (!state.isConnected) {
      throw new Error("Cannot delete book while offline");
    }

    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      setBooks((prevBooks) => prevBooks.filter((book) => book.$id !== id));
      const updatedLocalBooks = books;
      await AsyncStorage.setItem("bookList", JSON.stringify(updatedLocalBooks));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const loadBooks = async () => {
      const localBooks = await AsyncStorage.getItem("bookList");

      const unsubscribe = NetInfo.addEventListener((state) => {
        if (user) {
          // console.log("Is connected?", state.isConnected);

          if (!state.isConnected && localBooks) {
            setBooks(JSON.parse(localBooks));
          } else if (state.isConnected || !localBooks) {
            getBooks();
          }
        } else {
          setBooks([]);
        }
      });

      return unsubscribe;
    };

    const unsubscribePromise = loadBooks();

    return () => {
      unsubscribePromise.then((unsubscribe) => {
        unsubscribe();
      });
    };
  }); // removing dependency array makes offline message spawn unstoppably. Find better fix than commenting. (Or check if it's normal.)

  return (
    <BooksContext.Provider
      value={{
        books,
        getBooks,
        getBookById,
        createBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
