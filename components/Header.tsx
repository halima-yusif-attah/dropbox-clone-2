import { SignInButton, SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggler } from "./ThemeToggler"


function Header() {
  return (
    <header className="flex flex-1 items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <div className="bg-[#0160fe] w-fit">
          <Image
            src="https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png"
            alt="logo"
            width={50}
            height={50}
            className="invert"
          />
        </div>

        <h1 className="text-xl font-bold">Dropbox</h1>
      </Link>

      <div className="flex gap-2 p-5">
        {/* theme toggler */}
        <ThemeToggler />

        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard" mode="modal" />
        </SignedOut>

        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}

export default Header


