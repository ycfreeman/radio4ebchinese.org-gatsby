import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import { BlogPostTemplate } from "./blog-post";

const Group = ({ data }) => {
  const { markdownRemark: post } = data;
  const images = post.frontmatter.galleryImages.map(
    ({ image }) => image.childImageSharp
  );

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Group">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        images={images}
      />
    </Layout>
  );
};

Group.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default Group;

export const pageQuery = graphql`
  query GroupByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
        tags
        galleryImages {
          image {
            childImageSharp {
              thumb: fluid(maxWidth: 270, maxHeight: 270) {
                ...GatsbyImageSharpFluid
              }
              full: fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
