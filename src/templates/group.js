import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import { BlogPostTemplate } from "./blog-post";

const Group = ({ data }) => {
  const { markdownRemark: post } = data;
  const images = post.frontmatter.galleryImage.map(
    (image) => image.childImageSharp
  );

  return (
    <Layout title={`${post.frontmatter.title} | 節目組 | Groups`}>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet>
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
        galleryImage {
          childImageSharp {
            thumb: gatsbyImageData(
              width: 270
              height: 270
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
            full: gatsbyImageData(
              layout: FULL_WIDTH
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`;
