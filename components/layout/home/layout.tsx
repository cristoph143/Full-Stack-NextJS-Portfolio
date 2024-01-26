import Footer from "./footer";
import Main from "./main";
import Header from "./header";

interface Link {
  label: string;
  href: string;
}

interface HomeLayoutProps {
  children: React.ReactNode;
  links: Link[];
}

export default function HomeLayout({
  children,
  links,
}: Readonly<HomeLayoutProps>) {
  return (
    <div className="flex flex-col items-center flex-1 w-full gap-20">
      <Header links={links} />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
