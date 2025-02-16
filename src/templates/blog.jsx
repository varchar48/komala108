import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import { Helmet } from 'react-helmet'
import { format } from 'date-fns'

const shortcodes = { Link } // Provide common components here

const Head = ({ title }) => (
  <Helmet>
    <title>{title} | Re:M Physiotherapy Centre 勵衡物理治療中心</title>
  </Helmet>
);


export default function PageTemplate({ data, children }) {

  
const formattedDate = format(new Date(data.mdx.frontmatter.date), 'yyyy-MM-dd');

  return (
    <>
    <div className="container max-w-2xl grid gap-6 px-4 md:px-6 py-12">
      <div className="flex flex-col gap-6 border-b border-black">
        <img src={`/images/blog/${data.mdx.frontmatter.featureImg}`} alt={data.mdx.frontmatter.title} className="blog-sqimg" />
        <div className="pb-8 space-y-4">
          <h1>{data.mdx.frontmatter.title}</h1>
          <div className="flex flex-row gap-3 items-center">
            <p className="text-sm text-black px-2 py-1 bg-gray-200 rounded-md inline-block">{data.mdx.frontmatter.category}</p>
            <p className="border-l border-black ps-3 text-sm text-black">{formattedDate}</p>
          </div>
        </div>
      </div>
      
      <MDXProvider components={shortcodes}>
        {children}
      </MDXProvider>
    </div>

    <Head title={data.mdx.frontmatter.title} />
    </>
  )
}

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        category
        featureImg
        date
      }
    }
  }
`