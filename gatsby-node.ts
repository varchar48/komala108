import { GatsbyNode } from "gatsby";
import path from "path";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
        "@/data": path.resolve(__dirname, "src/data"),
        "@/utils": path.resolve(__dirname, "src/utils"),
        "@/hooks": path.resolve(__dirname, "src/hooks"),
      },
    },
  });
};

const path = require("path")
const blogTemplate = path.resolve(`./src/templates/blog.jsx`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors)
  }

  // Create blog post pages.
  const posts = result.data.allMdx.nodes

  // you'll call `createPage` for each result
  posts.forEach(node => {
    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path: node.frontmatter.slug,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: `${blogTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })
}

const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === "Mdx") {
    const slug = createFilePath({ node, getNode, basePath: "src/blog" })
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}
