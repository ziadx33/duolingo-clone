import { ActiveLink } from "@/components/active-link";
import { SIDEBAR_LINKS } from "@/constants";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";

export async function Sidebar() {
  const userData = await getServerAuthSession();
  const user = userData?.user;
  return (
    <aside className="h-full min-w-[13%] border-t-2 px-6 py-6 xl:border-r-2">
      <Image
        draggable="false"
        alt="logo"
        src="/images/logo.svg"
        width={150}
        height={150}
        className="mb-6 hidden xl:block"
      />
      <nav className="flex  flex-row gap-4  xl:flex-col">
        {SIDEBAR_LINKS.map((link) => (
          <ActiveLink
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl p-0 hover:bg-secondary 2xl:justify-start 2xl:pl-2 2xl:pr-4"
            activeClasses="bg-secondary"
            href={link.href}
            key={link.name}
            prefetch={false}
            cache={link.href !== "/leaderboard"}
          >
            <Image
              src={
                link.name === "profile"
                  ? user?.image ?? ""
                  : `/images/sidebar/${link.name}.svg`
              }
              alt={link.name}
              width={40}
              height={40}
              className={
                link.name === "profile"
                  ? "h-[40px] w-[40px] rounded-full object-cover"
                  : ""
              }
            />
            <span className="hidden 2xl:block">{link.name}</span>
          </ActiveLink>
        ))}
      </nav>
    </aside>
  );
}
