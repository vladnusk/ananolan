/**
 * Markdown/MDX rendering using next-mdx-remote.
 * Chosen over raw remark/rehype so we can optionally use React components in content
 * and keep a single pipeline for both static and CMS content. remark-gfm for tables/lists,
 * rehype-raw only if we need to allow HTML (can be removed for stricter security).
 */
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    // rehypePlugins: [rehypeRaw], // enable only if CMS can emit HTML
  },
};

interface MdxContentProps {
  source: string;
}

export function MdxContent({ source }: MdxContentProps) {
  return (
    <MDXRemote
      source={source}
      options={options}
      // components={{ ... }} for custom shortcodes if needed
    />
  );
}
