import { ArrowRight, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="bg-[#1E1919] dark: bg-slate-800 flex flex-col lg:flex-row">
        <div className="flex flex-col p-10 text-white space-y-5 bg-[#2B2929] dark:bg-slate-800">
          <h1 className="font-bold text-5xl">
            Welcome to Dropbox. <br />
            <br />
            Storing everything your business needs. All in one place
          </h1>

          <p className="pb-20">
            Enhance your personal storage with Dropbox, offering a simple and
            efficient way to upload, organize, and access files from anywhere.
            Securely store impoertant documents and media,a dn experience the
            convienience of easy file management and sharing in one centralized
            solution.
          </p>

          <Link href="/dashboard" className="bg-blue-500 flex w-fit p-5">
            Try for free
            <ArrowRight className="ml-10" />
          </Link>
        </div>

        <div className="p-10 h-full">
          <video autoPlay loop muted className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
            Your browser does not support a video tag
          </video>
        </div>
      </div>

      <p className="text-center font-bold text-xl pt-5">Disclaimer</p>
      <p className="text-center font-light p-2">
        This video is made for informational and educational purposes only. We
        do not own or affiliate with Dropbox or/and any od its subsidiaries in
        any form. Copyright Disclaimer under section 107 of the Copyright Acr
        1976, allowance is made for &quot;fair use&quot; of this video for
        educational purposes.
      </p>
    </main>
  );
}
