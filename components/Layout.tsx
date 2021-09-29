import { Navbar, NavbarProps } from "./Navbar";
import { Sidebar } from "./Sidebar";

export type LayoutProps = Pick<NavbarProps, "title"> & {
  children: React.ReactNode;
};

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 h-12 bg-white border-b border-gray-100">
        <Navbar title={title} className="h-full px-1.5 mx-auto max-w-7xl" />
      </header>

      <div className="flex items-start px-1.5 mx-auto max-w-7xl">
        <Sidebar className="sticky flex-shrink-0 w-56 pt-3 top-12" />
        <div className="w-px h-[calc(100vh-3rem)] bg-gray-100 sticky top-12"></div>

        <main className="flex-grow">{children}</main>
      </div>
    </div>
  );
};
