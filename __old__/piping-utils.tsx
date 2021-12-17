import { Descendant, NodeEntry, Element } from "slate";
import { ElementType } from "../components/editor/editor-types";

export type Pipe<T extends Descendant> = (
  entry: NodeEntry<T>
) => boolean | NodeEntry<T>;

/**
 * Returning true or node means continue piping with the last node or the returned node
 * Returning false means stop piping and return false as pipping final result (Function return)
 * @returns true if all pipes have been called and none of them returned false
 */
export function pipeToNode<T extends Descendant>(
  entry?: NodeEntry<T>,
  ...pipes: Pipe<T>[]
): boolean {
  if (!entry) return false;

  let lastEntry = entry;

  for (const pipe of pipes) {
    const res = pipe(lastEntry);

    if (typeof res === "boolean") {
      if (!res) return res; // False is returned from the pipe
    } else {
      lastEntry = res;
    }
  }

  // All pipes have been called and none of them returned false
  return true;
}

export const typePipe: (type: ElementType) => Pipe<Element> =
  (type) => (entry) =>
    entry[0].type === type ? entry : false;
