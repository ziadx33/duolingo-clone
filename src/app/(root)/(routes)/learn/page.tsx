import { Lessons } from "@/components/learn/lessons/lessons";
import { Sidebar } from "@/components/learn/sidebar/sidebar";

export default function Page() {
  return (
    <main className="flex h-screen w-full">
      <Sidebar />
      <Lessons />
    </main>
  );
}
