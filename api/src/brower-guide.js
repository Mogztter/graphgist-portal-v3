import Asciidoctor from "@asciidoctor/core";
const asciidoctor = Asciidoctor();

export function convert(graph) {
  const doc = asciidoctor.load(graph.asciidoc);
  return asciidoctor.convert(graph.asciidoc, {
    attributes: {
      graphGist: graph,
      "env-guide": true,
      experimental: true,
    },
    header_footer: true,
    catalog_assets: true,
    safe: 0,
    template_dir: "views",
    template_cache: false,
  });
}
