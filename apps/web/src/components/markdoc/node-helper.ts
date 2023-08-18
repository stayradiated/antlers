// Forked from https://github.com/flexdinesh/blogster/blob/main/packages/astro-markdoc-renderer/src/node-helper.ts

import type { RenderableTreeNodes, RenderableTreeNode } from "@markdoc/markdoc";
import Markdoc from "@markdoc/markdoc";

const { Tag: MarkdocTag } = Markdoc;

type Components = Record<
  string,
  {
    Component: any; // ASTRO component
    props: Record<string, string | number>;
  }
>;

type Node = {
  node: RenderableTreeNodes;
  tag: string | undefined;
  props: Record<string, string | number> | undefined;
  children: RenderableTreeNodes;
  components: any | null | undefined;

  innerHTML?: string;
};

const createNode = (
  content: RenderableTreeNodes,
  components?: Components,
): Node => {
  if (content === undefined) {
    throw new Error("Missing arg: content");
  }

  let node: Node = {
    node: content,
    tag: undefined,
    props: undefined,
    children: null,
    components,
    innerHTML: undefined,
  };

  node.children =
    typeof node.node === "object" && node.node && "children" in node.node
      ? node.node?.children
      : null;

  if (typeof node.node === "string" || typeof node.node === "number") {
    node.innerHTML = String(node.node);
  } else if (
    !Array.isArray(node.node) &&
    (node.node === null ||
      typeof node.node !== "object" ||
      !MarkdocTag.isTag(node.node))
  ) {
    node.innerHTML = "";
  }

  const nodeName =
    typeof node.node === "object" && node.node && "name" in node.node
      ? node.node.name
      : undefined;

  const nodeAttributes =
    typeof node.node === "object" &&
    node.node &&
    "attributes" in node.node &&
    typeof node.node.attributes === "object" &&
    node.node.attributes
      ? node.node.attributes
      : {};

  if (
    typeof nodeName === "string" &&
    typeof components === "object" &&
    nodeName in components
  ) {
    const component = components[nodeName];
    if (component) {
      node.tag = component.Component;
      node.props = {
        ...nodeAttributes,
        ...component.props,
        children: node.children,
      };
    }
  } else if (
    typeof nodeName === "string" &&
    typeof nodeAttributes === "object"
  ) {
    node.tag = nodeName;
    node.props = { ...nodeAttributes };
  }
  return node;
};

const assertValidNode = (node: Node): void => {
  if (
    typeof node.node === "object" &&
    node.node &&
    "name" in node.node &&
    typeof node.node.name === "string" &&
    // custom elements start with Uppercase
    node.node.name.charAt(0).toLowerCase() !== node.node.name.charAt(0) &&
    // TODO: this condition could be improved
    typeof node.components === "object" &&
    // component for the custom element not found
    !(node.node.name in node.components)
  ) {
    throw new Error(`No renderer provided for element: ${node.node.name}`);
  }
};

const shouldRenderInnerHTML = (
  node: Node,
): node is Omit<Node, "innerHTML"> & { innerHTML: string } => {
  return typeof node.innerHTML !== "undefined";
};

const shouldRenderNode = (
  node: Node,
): node is Omit<Node, "node"> & { node: RenderableTreeNode[] } => {
  return Array.isArray(node.node);
};

const shouldRenderTag = (
  node: Node,
): node is Omit<Node, "tag"> & { tag: string } => {
  return typeof node.tag !== "undefined";
};

const shouldRenderChildren = (
  node: Node,
): node is Omit<Node, "children"> & { children: RenderableTreeNode[] } =>
  Array.isArray(node.children);

export {
  createNode,
  assertValidNode,
  shouldRenderInnerHTML,
  shouldRenderNode,
  shouldRenderTag,
  shouldRenderChildren,
};
