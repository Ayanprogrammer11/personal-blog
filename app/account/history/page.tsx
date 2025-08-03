import { History } from "lucide-react";

export const revalidate = 0;

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export default async function HistoryPage() {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const json: User[] = await data.json();
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
          <History className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-800">
            History
          </h1>
          <p className="text-sage-600">
            Your reading history and activity timeline
          </p>
        </div>
      </div>

      <div className="card">
        <p className="text-sage-700">Reading history will be displayed here.</p>
      </div>
    </div>
  );
}
