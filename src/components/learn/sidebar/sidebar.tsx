import { ActiveLink } from "@/components/active-link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SIDEBAR_LINKS } from "@/constants";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";

export async function Sidebar() {
  const userData = await getServerAuthSession();
  const user = userData?.user;
  return (
    <aside className="fixed z-10 mt-auto h-[10%] min-w-[13%] bg-background px-6 pb-6 pt-4 max-lg:w-full max-lg:border-t-2 lg:border-r-2 xl:mt-0 xl:h-full">
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
          <>
            {link.href === "/profile" && <ModeToggle />}
            <ActiveLink
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl p-0 hover:bg-secondary 2xl:justify-start 2xl:pl-2 2xl:pr-4"
              activeClasses="bg-secondary"
              href={link.href}
              key={link.name}
              prefetch={false}
              revalidate={link.href === "/leaderboard"}
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
          </>
        ))}
      </nav>
    </aside>
  );
}
