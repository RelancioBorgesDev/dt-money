import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

interface ITransactions {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface ICreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}
interface ITransactionsContexts {
  transactions: ITransactions[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: ICreateTransactionInput) => Promise<void>;
}

interface ITransactionsProvider {
  children: ReactNode;
}

export const TransactionsContexts = createContext({} as ITransactionsContexts);

export function TransactionsProvider({ children }: ITransactionsProvider) {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get("transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });

    setTransactions(response.data);
  }, []);

  const createTransaction = useCallback(
    async (data: ICreateTransactionInput) => {
      const { description, price, category, type } = data;

      const response = await api.post("transactions", {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      });

      setTransactions((state) => [response.data, ...state]);
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);
  return (
    <TransactionsContexts.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContexts.Provider>
  );
}
