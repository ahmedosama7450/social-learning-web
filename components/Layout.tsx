import { PropsWithRequiredChildren } from "overwind-ui";

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
        <Navbar user={user} title={title} className="layout-boundary h-full" />
      </header>

      <div className="layout-boundary flex items-start">
        <Sidebar className="sticky top-[var(--navbar-height)] h-[calc(100vh-var(--navbar-height))] shrink-0 overflow-y-auto border-r border-gray-100 pt-[var(--navbar-margin-bottom)]" />

        <main className="grow">{children}</main>
      </div>
    </div>
  );
};
