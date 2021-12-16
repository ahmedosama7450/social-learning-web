import classNames from "classnames";
import { RenderElementProps, useFocused, useSelected } from "slate-react";

import { LinkElement } from "..";

export const renderElement = (props: RenderElementProps) => {
  const { element, attributes, children } = props;

  switch (element.type) {
    case "heading1":
      return <h2 {...attributes}>{children}</h2>;
    case "heading2":
      return <h3 {...attributes}>{children}</h3>;
    case "quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "code-block":
      return (
        <pre {...attributes}>
          <code>{children}</code>
        </pre>
      );
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "link":
      return <LinkElement {...props} />;
    case "separator":
      return <SeparatorElement {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const LinkElement = ({ attributes, children, element }: RenderElementProps) => {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <a
      {...attributes}
      href={(element as LinkElement).url}
      className={classNames("hover:text-primary-700", {
        "bg-primary-50": selected && focused,
      })}
    >
      {children}
    </a>
  );
};

const SeparatorElement = ({ attributes, children }: RenderElementProps) => {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div
      {...attributes}
      style={{
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
      }}
      className={classNames(
        "cursor-default ring-offset-4 ring-offset-white",
        selected && focused
          ? "ring-2 ring-primary-400"
          : "hover:ring-2 hover:ring-yellow-200"
      )}
    >
      {children}
      <div contentEditable={false}>
        <hr
          style={{
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }}
        />
      </div>
    </div>
  );
};
