import { ActiveLink } from "@/components/active-link";
import { SIDEBAR_LINKS } from "@/constants";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";

export async function Sidebar() {
  const { user } = await getServerAuthSession();
  return (
    <aside className="h-full min-w-[13%] border-r-2 px-6 py-6">
      <Image
        draggable="false"
        alt="logo"
        src="/images/logo.svg"
        width={150}
        height={150}
        className="mb-6"
      />
      <nav className="flex flex-col gap-4">
        {SIDEBAR_LINKS.map((link) => (
          <ActiveLink
            className="flex h-12 items-center justify-center gap-2 rounded-lg p-0 hover:bg-secondary 2xl:justify-start 2xl:pl-2 2xl:pr-4"
            activeClasses="bg-secondary"
            href={link.href}
            key={link.name}
            prefetch={false}
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
              className={link.name === "profile" ? "rounded-full" : ""}
            />
            <span className="hidden 2xl:block">{link.name}</span>
          </ActiveLink>
        ))}
      </nav>
    </aside>
  );
}
