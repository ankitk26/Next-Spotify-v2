"use client";

import DOMPurify from "dompurify";
import parse, {
  attributesToProps,
  type DOMNode,
  domToReact,
} from "html-react-parser";

type CustomDOMNode = DOMNode & {
  name?: string;
  attribs?: Record<string, string>;
  children?: DOMNode[];
};

export default function PlaylistDescription({
  description,
}: {
  description: string;
}) {
  return (
    <p className="mt-3 font-medium text-sm">
      {parse(DOMPurify.sanitize(description), {
        replace: (domNode: DOMNode) => {
          // Type guard to check if node is a custom DOM node with name
          if (
            typeof domNode === "object" &&
            "name" in domNode &&
            domNode.name === "a"
          ) {
            const node = domNode as CustomDOMNode;
            const props = node.attribs ? attributesToProps(node.attribs) : {};

            return (
              <a
                {...props}
                className="text-blue-500 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                {node.children ? domToReact(node.children) : null}
              </a>
            );
          }
          return domNode;
        },
      })}
    </p>
  );
}
