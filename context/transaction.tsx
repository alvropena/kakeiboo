import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
};

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (description: string, amount: number) => Promise<void>;
  clearTransactions: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export function TransactionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;

      const formattedTransactions: Transaction[] = data.map((t) => ({
        id: t.id,
        date: t.date,
        description: t.description,
        amount: t.amount,
      }));

      setTransactions(formattedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const addTransaction = async (description: string, amount: number) => {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .insert([{ description, amount }])
        .select()
        .single();

      if (error) throw error;

      const newTransaction: Transaction = {
        id: data.id,
        date: data.date,
        description: data.description,
        amount: data.amount,
      };

      setTransactions((prev) => [newTransaction, ...prev]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const clearTransactions = async () => {
    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .neq("id", "0");

      if (error) throw error;
      setTransactions([]);
    } catch (error) {
      console.error("Error clearing transactions:", error);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        clearTransactions,
        fetchTransactions,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }
  return context;
}
