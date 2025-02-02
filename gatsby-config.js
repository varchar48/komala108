/**
 * @type {import('gatsby').GatsbyConfig}
 */

module.exports = {
  siteMetadata: {
    title: `Re:M Physiotherapy Centre 勵衡物理治療中心`, // Change to your event name
    description: `Registered Physiotherapy Center in Hong Kong, Restore Rehab Relief in Motion | Fascial Manipulation，Schroth mothed, Manipulation Therapy, Pilates, Modern Acupuncture, Extracorporeal Shockwave Therapy, Interferential Therapy, Ultrasound Therapy`,
    image: `/reim_logo.png`, // This is the image for SEO. Use event logo
    siteUrl: `https://reimphysio.com/`, // Change to your site URL
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/reim_favicon.png', // This is favicon
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
      __key: 'images',
    },
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog`,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-google-gtag',
    //   options: {
    //     trackingIds: ['G-IDHere'], // Replace with your Google Analytics ID
    //     gtagConfig: {
    //       anonymize_ip: true,
    //       cookie_expires: 0,
    //     },
    //     pluginConfig: {
    //       head: true,
    //       respectDNT: true,
    //       exclude: ['/preview/**', 'http://localhost:8000/**', 'http://localhost:8001/**', 'http://localhost:8002/**'],
    //     },
    //   },
    // },
  ],
};
