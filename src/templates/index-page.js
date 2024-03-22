import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import { HTMLContent } from '../components/Content'
import { Helmet } from 'react-helmet'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const IndexPageTemplate = ({ html, image, heading, subheading, mainpitch }) => (
  <>
    <div style={{ display: 'grid' }}>
      <GatsbyImage
        style={{
          gridArea: '1/1',
        }}
        layout="fullWidth"
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
        <div>
          <h1
            className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen hero-text"
            style={{
              boxShadow:
                'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
              backgroundColor: 'rgb(255, 68, 0)',
              color: 'white',
              lineHeight: '1',
              padding: '0.25em',
            }}
          >
            {heading}
          </h1>
          {subheading ? (
            <h3
              className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
              style={{
                boxShadow:
                  'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
                backgroundColor: 'rgb(255, 68, 0)',
                color: 'white',
                lineHeight: '1',
                padding: '0.25em',
              }}
            >
              {subheading}
            </h3>
          ) : null}
        </div>
      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="content">
              <div className="columns">
                <div className="column is-12">
                  <HTMLContent content={html} />
                </div>
              </div>
              <div className="column is-12">
                <h3 className="has-text-weight-semibold is-size-4">
                  最新動態 | Latest stories
                </h3>
                <BlogRoll />
                <div className="column is-12 has-text-centered">
                  <Link className="btn" to="/news">
                    瀏覽更多 | Read more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark
  const featuredimage = getImage(frontmatter.featuredimage)

  return (
    <Layout>
      <Helmet>
        <title>{frontmatter.title}</title>
      </Helmet>
      <IndexPageTemplate
        html={html}
        image={featuredimage}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        description={frontmatter.description}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      id
      html
      frontmatter {
        title
        featuredimage {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        heading
        subheading
        description
      }
    }
  }
`
