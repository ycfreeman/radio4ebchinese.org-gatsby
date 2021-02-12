import React from "react";

import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import BackgroundImage from "gatsby-background-image";

export const BlogIndexPageTemplate = ({ image, heading }) => {
  return (
    <>
      <BackgroundImage
        fluid={image.childImageSharp.fluid}
        className="full-width-image margin-top-0 hero-bg"
      >
        <h1
          className="has-text-weight-bold is-size-1"
          style={{
            boxShadow: "0.5rem 0 0 #f40, -0.5rem 0 0 #f40",
            backgroundColor: "#f40",
            color: "white",
            padding: "1rem",
          }}
        >
          {heading}
        </h1>
      </BackgroundImage>
      <section className="section">
        <div className="container">
          <div className="content">
            <BlogRoll />
          </div>
        </div>
      </section>
    </>
  );
};

const BlogIndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout title={frontmatter.title}>
      <BlogIndexPageTemplate
        image={frontmatter.featuredimage}
        heading={frontmatter.heading}
      />
    </Layout>
  );
};

export default BlogIndexPage;

export const pageQuery = graphql`
  query BlogIndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "blog-index-page" } }) {
      id
      frontmatter {
        title
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 2048) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        heading
      }
    }
  }
`;
