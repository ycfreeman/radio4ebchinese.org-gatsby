import React from 'react'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'

const BlogIndexPageTemplate = ({ image, heading }) => {
  return (
    <>
      <div style={{ display: 'grid' }}>
        <GatsbyImage
          style={{
            gridArea: '1/1',
          }}
          layout="fullWidth"
          // You can optionally force an aspect ratio for the generated image
          alt={heading}
          image={image}
          className="full-width-image margin-top-0 hero-bg"
        />
        <div
          style={{
            // By using the same grid area for both, they are stacked on top of each other
            gridArea: '1/1',
            position: 'relative',
            // This centers the other elements inside the hero component
            placeItems: 'center',
            display: 'grid',
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
              backgroundColor: '#f40',
              color: 'white',
              padding: '1rem',
            }}
          >
            {heading}
          </h1>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="content">
            <BlogRoll />
          </div>
        </div>
      </section>
    </>
  )
}

const BlogIndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  const featuredimage = getImage(frontmatter.featuredimage)

  return (
    <Layout title={frontmatter.title}>
      <BlogIndexPageTemplate
        image={featuredimage}
        heading={frontmatter.heading}
      />
    </Layout>
  )
}

export default BlogIndexPage

export const pageQuery = graphql`
  query BlogIndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "blog-index-page" } }) {
      id
      frontmatter {
        title
        featuredimage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, formats: [AUTO, WEBP, AVIF])
          }
        }
        heading
      }
    }
  }
`
