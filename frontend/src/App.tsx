import { useEffect, useState } from "react";
import "./App.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

async function getTotalSpent() {
  const result = await api.expenses["total-spent"].$get();
  if (!result.ok) {
    throw new Error("server error");
  }
  const data = await result.json();
  return data;
}

function App() {
  const { data, isPending, error } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) return "An error has occured: " + error.message;

  return (
    <Card className="w-96 m-auto">
      <CardHeader>
        <CardTitle>Total spent</CardTitle>
        <CardDescription>Total amount spent</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? "..." : data?.total}</CardContent>
    </Card>
  );
}

export default App;
