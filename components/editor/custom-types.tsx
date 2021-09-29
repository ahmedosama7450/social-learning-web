import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

//
// Elements
//

export type CustomElement =
  | ParagraphElement
  | Heading1Element
  | Heading2Element
  | Heading3Element
  | QuoteElement
  | CodeBlockElement
  | BulletedListElement
  | NumberedListElement
  | ListItemElement
  | LinkElement;

export type ElementType = CustomElement["type"];

export type ParagraphElement = {
  type: "paragraph";
  children: FormattedText[];
};

export type Heading1Element = {
  type: "heading1";
  children: FormattedText[];
};

export type Heading2Element = {
  type: "heading2";
  children: FormattedText[];
};

export type Heading3Element = {
  type: "heading3";
  children: FormattedText[];
};

export type QuoteElement = {
  type: "quote";
  children: FormattedText[];
};

export type CodeBlockElement = {
  type: "code-block";
  children: PlainText[];
};

export type BulletedListElement = {
  type: "bulleted-list";
  children: FormattedText[];
};

export type NumberedListElement = {
  type: "numbered-list";
  children: FormattedText[];
};

export type ListItemElement = { type: "list-item"; children: FormattedText[] };

export type LinkElement = { type: "link"; url: string; children: PlainText[] };

export type MentionElement = {
  type: "mention";
  name: string;
  children: PlainText[];
};

//
// Text
//
export type CustomText = FormattedText;

export type PlainText = { text: string };

export type TextFormat =
  | "bold"
  | "italic"
  | "underlined"
  | "strikeThrough"
  | "superscript"
  | "subscript"
  | "code"
  | "highlighted";

export type FormattedText = {
  text: string;
} & { [key in TextFormat]?: boolean };

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
