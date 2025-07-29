// app/subscribe/page.tsx
import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
import SignInPage from "@/app/components/SignInPage";
import SubscriptionPlans from "@/app/components/SubscriptionPlans";

export default async function SubscribePage() {
  const session = await auth();

  if (!session) {
    return <SignInPage />;
  }

  return <SubscriptionPlans user={session.user} />;
}
