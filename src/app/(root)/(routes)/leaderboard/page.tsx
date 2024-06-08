import Leaderboard from "@/components/leaderboard";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function Page() {
  return <Leaderboard />;
}
