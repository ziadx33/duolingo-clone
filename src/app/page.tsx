import { Content } from "./_components/content";
import { Header } from "./_components/header";
import { LanguagesBar } from "./_components/languages-bar/languages-bar";

export default function Home() {
  return (
    <main className="h-screen w-full">
      <div className="container mx-auto h-[calc(100vh-5rem)]">
        <Header />
        <div className="h-[calc(100%-5rem)] w-full">
          <Content />
        </div>
      </div>
      <LanguagesBar />
    </main>
  );
}
