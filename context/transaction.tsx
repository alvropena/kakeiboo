import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { AuthContext } from "@/provider/auth";

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  user_id: string;
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
  const { userProfile } = useContext(AuthContext);

  const fetchTransactions = async () => {
    try {
      if (!userProfile?.id) return;

      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", userProfile.id)
        .order("date", { ascending: false });

      if (error) throw error;

      const formattedTransactions: Transaction[] = data.map((t) => ({
        id: t.id,
        date: t.date,
        description: t.description,
        amount: t.amount,
        user_id: t.user_id,
      }));

      setTransactions(formattedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (userProfile?.id) {
      fetchTransactions();
    }
  }, [userProfile?.id]);

  const addTransaction = async (description: string, amount: number) => {
    try {
      if (!userProfile?.id) return;

      const { data, error } = await supabase
        .from("transactions")
        .insert([{ 
          description, 
          amount,
          user_id: userProfile.id 
        }])
        .select()
        .single();

      if (error) throw error;

      const newTransaction: Transaction = {
        id: data.id,
        date: data.date,
        description: data.description,
        amount: data.amount,
        user_id: data.user_id,
      };

      setTransactions((prev) => [newTransaction, ...prev]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const clearTransactions = async () => {
    try {
      if (!userProfile?.id) return;

      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("user_id", userProfile.id);

      if (error) throw error;
      setTransactions([]);
    } catch (error) {
      console.error("Error clearing transactions:", error);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      if (!userProfile?.id) return;

      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id)
        .eq("user_id", userProfile.id);

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
