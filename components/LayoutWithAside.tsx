import { Layout, LayoutProps } from "./Layout";

export type LayoutWithAsideProps = LayoutProps & {
  asideContent: React.ReactNode;
  /**
   *  Wrap the direct children of the underlying layout however you want
   *  E.g. when you need to wrap it in a form
   */
  wrapLayoutChildren?: (children: React.ReactNode) => React.ReactNode;
};

export const LayoutWithAside = ({
  asideContent,
  wrapLayoutChildren,

  children,
  ...rest
}: LayoutWithAsideProps) => {
  // TODO Is this okay to store JSX in a variable (What about performance ?)
  const content = (
    <div className="flex items-start">
      <div className="grow w-[67%] px-[var(--sidebar-margin-right)]">
        {children}
      </div>
      <aside className="hidden lg:block grow w-[33%] pt-[var(--navbar-margin-bottom)] sticky top-[var(--navbar-height)]">
        {asideContent}
      </aside>
    </div>
  );

  return (
    <Layout {...rest}>
      {wrapLayoutChildren ? wrapLayoutChildren(content) : content}
    </Layout>
  );
};
