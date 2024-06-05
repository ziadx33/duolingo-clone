import { SubscriptionsList } from "../../../components/subscriptions/subscriptions-list";

export default function Page() {
  return (
    <div className="grid h-screen w-full place-items-center">
      <h1 className="w-[50rem] text-center text-3xl">
        Choose a plan to change your duolingo experience to the next level!
      </h1>
      <SubscriptionsList />
    </div>
  );
}
