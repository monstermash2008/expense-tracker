import { useEffect, useState } from "react";
import "./App.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotal() {
      const res = await fetch("/api/expenses/total-spent");
      const data = await res.json();
      setTotalSpent(data.total);
    }

    fetchTotal();
  }, []);

  return (
    <Card className="w-96 m-auto">
      <CardHeader>
        <CardTitle>Total spent</CardTitle>
        <CardDescription>Total amount spent</CardDescription>
      </CardHeader>
      <CardContent>{totalSpent}</CardContent>
    </Card>
  );
}

export default App;
