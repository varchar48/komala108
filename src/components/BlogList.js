import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Link } from "gatsby"

const BlogList = () => {
  const data = useStaticQuery(graphql`
    query AllBlogPosts {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              category
              featureImg
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `)

  const posts = data.allMdx.edges

  return (
    <>
        <h1 className="mb-8">文章一覽</h1>
        <ul className="space-y-8 px-0">
          {posts.map(({ node }) => (
            <li key={node.id}>
              <div className="flex lg:flex-row flex-col gap-4">
                <div className="lg:basis-1/4">
                  <img src={`/images/blog/${node.frontmatter.featureImg}`} alt={node.frontmatter.title} className="w-full rounded-lg object-cover aspect-square" />
                </div>
                <div className="lg:basis-3/4">
                  <h2>
                    <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                  </h2>
                  <p className="text-sm px-4 py-2 bg-gray-200 rounded-md inline-block">{node.frontmatter.category}</p>
                  <p className="mt-3">{node.frontmatter.date}</p>
                  <p>{node.excerpt}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
    </>
  )
}

export default BlogList