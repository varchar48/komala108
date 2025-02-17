import React, { useState } from 'react'
import { graphql, useStaticQuery } from "gatsby"
import { Link } from "gatsby"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

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

  const sortedPosts = posts.sort((a, b) => new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date));

  // Slice the first 4 posts
  const firstFourPosts = sortedPosts.slice(0, 4);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
        <h1 className="mb-8">文章一覽</h1>

        {isCollapsed && (
        <div className="container px-0 grid lg:grid-cols-2 gap-8">
        {firstFourPosts.map(({ node }) => (
           <Link to={node.fields.slug}>
          <div className="flex lg:flex-row flex-col rounded-lg bg-white hover:bg-gray-50 shadow-md" key={node.id}>
            <div className="lg:basis-1/3">
              <img src={`/images/blog/${node.frontmatter.featureImg}`} alt={node.frontmatter.title} className="w-full lg:rounded-s-lg max-lg:rounded-t-lg object-cover aspect-square" />
            </div>
            <div className="lg:basis-2/3 p-6 space-y-4">
              <p className="text-xl font-bold line-clamp-1">
               {node.frontmatter.title}
              </p>
              <div className="flex flex-row gap-3 items-center">
                <p className="text-sm text-black px-2 py-1 bg-gray-200 rounded-md inline-block">{node.frontmatter.category}</p>
                <p className="border-l border-black ps-3 text-sm text-black">{node.frontmatter.date}</p>
              </div>
              <p className="line-clamp-3 text-sm text-gray-600">{node.excerpt}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
        )}

        <Collapsible>
          <CollapsibleTrigger onClick={handleToggle}>
          <Button className="my-4">
          {isCollapsed ? "列出所有文章" : "收起所有文章"}
          </Button>          
          </CollapsibleTrigger>
          <CollapsibleContent>

    {!isCollapsed && (      
        <div className="container px-0 grid lg:grid-cols-2 gap-8">
        {sortedPosts.map(({ node }) => (
          <Link to={node.fields.slug}>
            <div className="flex lg:flex-row flex-col rounded-lg bg-white hover:bg-gray-50 shadow-md" key={node.id}>
              <div className="lg:basis-1/3">
                <img src={`/images/blog/${node.frontmatter.featureImg}`} alt={node.frontmatter.title} className="w-full lg:rounded-s-lg max-lg:rounded-t-lg object-cover aspect-square" />
              </div>
              <div className="lg:basis-2/3 p-6 space-y-4">
                <p className="text-xl font-bold line-clamp-1">
                  {node.frontmatter.title}
                </p>
                <div className="flex flex-row gap-3 items-center">
                <p className="text-sm text-black px-2 py-1 bg-gray-200 rounded-md inline-block">{node.frontmatter.category}</p>
                <p className="border-l border-black ps-3 text-sm text-black">{node.frontmatter.date}</p>
                </div>
                <p className="line-clamp-3 text-sm text-gray-600">{node.excerpt}</p>
              </div>
            </div>
            </Link>
        ))}
        </div>
)}
        </CollapsibleContent>
        </Collapsible>
    </>
  )
}

export default BlogList