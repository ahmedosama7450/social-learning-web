import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Plate } from "@udecode/plate-core";

import { Layout } from "../components/Layout";

/* import "tippy.js/dist/tippy.css"; */
import React, { useMemo } from "react";
import {
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  createPlateComponents,
  createPlateOptions,
  HeadingToolbar,
  MentionSelect,
  PlatePlugin,
  ToolbarSearchHighlight,
  createAlignPlugin,
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHighlightPlugin,
  createHistoryPlugin,
  createKbdPlugin,
  createImagePlugin,
  createItalicPlugin,
  createLinkPlugin,
  createListPlugin,
  createMediaEmbedPlugin,
  createNodeIdPlugin,
  createParagraphPlugin,
  createReactPlugin,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createDndPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
  createDeserializeHTMLPlugin,
  useFindReplacePlugin,
  useMentionPlugin,
  withProps,
  MentionElement,
  ELEMENT_MENTION,
  SPEditor,
  MARK_COLOR,
  withStyledProps,
  StyledLeaf,
  MARK_BG_COLOR,
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createDeserializeMDPlugin,
  createDeserializeCSVPlugin,
  createDeserializeAstPlugin,
} from "@udecode/plate";
import {
  createExcalidrawPlugin,
  ELEMENT_EXCALIDRAW,
  ExcalidrawElement,
} from "@udecode/plate-excalidraw";
import { initialValuePlayground } from "../components/plate-stuff/initialValues";
import {
  editableProps,
  optionsExitBreakPlugin,
  optionsMentionPlugin,
  optionsResetBlockTypePlugin,
  optionsSoftBreakPlugin,
  optionsAutoformat,
} from "../components/plate-stuff/pluginOptions";
import { renderMentionLabel } from "../components/plate-stuff/renderMentionLabel";
import {
  BallonToolbarMarks,
  ToolbarButtons,
} from "../components/plate-stuff/Toolbars";
import { withStyledPlaceHolders } from "../components/plate-stuff/withStyledPlaceHolders";
import { withStyledDraggables } from "../components/plate-stuff/withStyledDraggables";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Search } from "@styled-icons/material/Search";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

type TEditor = SPEditor & ReactEditor & HistoryEditor;

const id = "Examples/Playground";

let components = createPlateComponents({
  [ELEMENT_MENTION]: withProps(MentionElement, {
    renderLabel: renderMentionLabel,
  }),
  [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
  [MARK_COLOR]: withStyledProps(StyledLeaf, {
    leafProps: {
      [MARK_COLOR]: ["color"],
    },
  }),
  [MARK_BG_COLOR]: withStyledProps(StyledLeaf, {
    leafProps: {
      [MARK_BG_COLOR]: ["backgroundColor"],
    },
  }),
  // customize your components by plugin key
});
components = withStyledPlaceHolders(components);
components = withStyledDraggables(components);

const options = createPlateOptions({
  // customize your options by plugin key
});

const CreateDiscussionPage: NextPage = () => {
  const { setSearch, plugin: searchHighlightPlugin } = useFindReplacePlugin();
  const { getMentionSelectProps, plugin: mentionPlugin } =
    useMentionPlugin(optionsMentionPlugin);

  const pluginsMemo: PlatePlugin<TEditor>[] = useMemo(() => {
    const plugins = [
      createReactPlugin(),
      createHistoryPlugin(),
      createParagraphPlugin(),
      createBlockquotePlugin(),
      createTodoListPlugin(),
      createHeadingPlugin(),
      createImagePlugin(),
      createLinkPlugin(),
      createListPlugin(),
      createTablePlugin(),
      createMediaEmbedPlugin(),
      createCodeBlockPlugin(),
      createExcalidrawPlugin(),
      createAlignPlugin(),
      createBoldPlugin(),
      createCodePlugin(),
      createItalicPlugin(),
      createHighlightPlugin(),
      createUnderlinePlugin(),
      createStrikethroughPlugin(),
      createSubscriptPlugin(),
      createSuperscriptPlugin(),
      createFontColorPlugin(),
      createFontBackgroundColorPlugin(),
      createKbdPlugin(),
      createNodeIdPlugin(),
      createDndPlugin(),
      createAutoformatPlugin(optionsAutoformat),
      createResetNodePlugin(optionsResetBlockTypePlugin),
      createSoftBreakPlugin(optionsSoftBreakPlugin),
      createExitBreakPlugin(optionsExitBreakPlugin),
      createTrailingBlockPlugin({
        type: ELEMENT_PARAGRAPH,
      }),
      createSelectOnBackspacePlugin({
        allow: [ELEMENT_IMAGE, ELEMENT_EXCALIDRAW],
      }),
      mentionPlugin,
      searchHighlightPlugin,
    ];

    plugins.push(
      ...[
        createDeserializeMDPlugin({ plugins }),
        createDeserializeCSVPlugin({ plugins }),
        createDeserializeHTMLPlugin({ plugins }),
        createDeserializeAstPlugin({ plugins }),
      ]
    );

    return plugins;
  }, [mentionPlugin, searchHighlightPlugin]);

  return (
    <Layout>
      <DndProvider backend={HTML5Backend}>
        <Plate
          id={id}
          plugins={pluginsMemo}
          components={components}
          options={options}
          editableProps={editableProps}
          initialValue={initialValuePlayground}
        >
          {/* <ToolbarSearchHighlight icon={Search} setSearch={setSearch} /> */}
          <HeadingToolbar>
            <ToolbarButtons />
          </HeadingToolbar>

          <BallonToolbarMarks />

          <MentionSelect
            {...getMentionSelectProps()}
            renderLabel={renderMentionLabel}
          />
        </Plate>
      </DndProvider>
    </Layout>
  );
};

export default CreateDiscussionPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "validation",
        "edu-orgs",
        "profile",
        "home",
      ])),
    },
  };
};
