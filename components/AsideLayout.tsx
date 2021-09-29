import { Layout, LayoutProps } from "./Layout";

export const AsideLayout = ({
  children,
  aside,
  title,
}: LayoutProps & { aside: React.ReactNode }) => {
  return (
    <Layout title={title}>
      <div className="flex items-start gap-4">
        <div className="w-[66.5%] flex-grow">{children}</div>
        <aside className="sticky w-[33.5%] h-[calc(100vh-3.75rem)] flex-grow pt-3 top-12">
          {aside}
        </aside>
      </div>
    </Layout>
  );
};
