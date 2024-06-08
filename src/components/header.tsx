import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="h-20 w-full">
      <div className="mx-auto h-full w-fit py-6 lg:mx-0 lg:ml-2">
        <nav>
          <ul className="flex items-center justify-start">
            <li>
              <Link href="/">
                <Image
                  draggable="false"
                  alt="logo"
                  src="/images/logo.svg"
                  width={150}
                  height={150}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
