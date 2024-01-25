import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SideNavigation from "./SideNavigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavigationHeading from "./NavigationHeading";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
interface MainLayoutProps {
  children: ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  if (!user) {
    return redirect("/login");
  }

  return (
    <main className="flex">
      <SideNavigation />
      <section className="w-full">
        <header className="fixed right-0 z-10 p-3 bg-white border-b left-60">
          <div className="container flex items-center justify-between">
            <div>
              <NavigationHeading />
            </div>
            <div className="flex justify-center gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"}>
                    <PlusIcon className="mr-2" /> Create
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                  <Link href={"/admin/projects/create"}>
                    <DropdownMenuItem className="text-gray-500 cursor-pointer">
                      Project
                    </DropdownMenuItem>
                  </Link>
                  <Link href={"/admin/blogs/create"}>
                    <DropdownMenuItem className="text-gray-500 cursor-pointer">
                      Blog
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      {user?.email && user.email[0]}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem className="text-gray-500">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <form action={signOut}>
                    <button className="block w-full px-2 py-2 text-sm text-left no-underline rounded-md hover:bg-gray-100 bg-btn-background">
                      Logout
                    </button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <div className="absolute bottom-0 right-0 left-60 top-24 right-5">
          <div className="container">{children}</div>
        </div>
        {/* <div className="w-1/2 max-w-6xl p-5 mt-20 ml-auto mr-auto"></div> */}
      </section>
    </main>
  );
}
