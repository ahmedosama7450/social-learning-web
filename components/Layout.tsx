import { PropsWithRequiredChildren } from "../lib/types";
import { Navbar, NavbarProps } from "./Navbar";
import { Sidebar } from "./Sidebar";

/*
  Overview of the layout responsiveness:

  At first, search is collapsed into an icon - profile details are hidden - logo name is hidden - title has arbitrary left margin - convenient padding on the sides without max width

  xs: collapsed sidebar shows - title aligns with main content - profile details shows - different sides padding with max width (w-2xl)

  sm: different sides padding only

  md: search expanded to some width

  lg: search gets wider - different sides padding with max width (w-6xl)

  xl: search gets even wider - complete sidebar shows - different sides padding with max width (w-7xl)
  
*/

export type LayoutProps = PropsWithRequiredChildren<NavbarProps>;

export const Layout = ({ children, title, user }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 h-[var(--navbar-height)] bg-white shadow-sm">
        <Navbar user={user} title={title} className="h-full layout-boundary" />
      </header>

      <div className="flex items-start layout-boundary">
        <Sidebar className="sticky top-[var(--navbar-height)] pt-[var(--navbar-margin-bottom)] h-[calc(100vh-var(--navbar-height))] overflow-y-auto shrink-0 border-r border-gray-100" />

        <main className="grow">{children}</main>
      </div>
    </div>
  );
};
