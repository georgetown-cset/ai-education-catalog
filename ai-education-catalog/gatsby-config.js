module.exports = {
  siteMetadata: {
    title: `AI Education Catalog`,
    description: `Catalog of AI-related education programs`,
    author: `CSET and AI Education`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-use-query-params`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        start_url: '/',
        icon: 'src/images/favicon.ico',
      },
    },
  ],
}
