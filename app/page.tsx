import Header from "@/components/layout/home/header";
import Main from "@/components/layout/home/main";
import Footer from "@/components/layout/home/footer";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import ConnectSupabaseSteps from "@/components/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/SignUpUserSteps";
const userLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Blogs", href: "/admin/blogs" },
];
const homeLinks = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about-me" },
  { label: "Contact Me", href: "/contact-me" },
];
export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isAuthenticated = user;

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex flex-col items-center flex-1 w-full gap-20">
      <Header links={isAuthenticated ? userLinks : homeLinks} />
      <Main>
        {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
      </Main>
      <Footer />
    </div>
  );
}
