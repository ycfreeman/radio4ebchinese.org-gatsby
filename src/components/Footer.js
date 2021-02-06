import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

const Footer = () => {
  const data = useStaticQuery(graphql`
    query GroupsQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "group" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);
  const { edges: groups } = data.allMarkdownRemark;

  return (
    <footer className="footer has-background-black has-text-white-ter">
      <div className="content has-text-centered has-background-black has-text-white-ter">
        <div className="container has-background-black has-text-white-ter">
          <div style={{ maxWidth: "100vw" }} className="columns">
            <div className="column is-4">
              <section className="menu">
                <ul className="menu-list">
                  <li>
                    <Link to="/" className="navbar-item">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar-item" to="/news">
                      News
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar-item" to="/programme-timetable">
                      Programme Timetable
                    </Link>
                  </li>
                </ul>
              </section>
            </div>
            <div className="column is-4">
              <section className="menu">
                <p className="menu-label">Groups</p>
                <ul className="menu-list">
                  {groups.map(({ node: group }) => {
                    return (
                      <li key={`footer-group-${group.fields.slug}`}>
                        <Link className="navbar-item" to={group.fields.slug}>
                          {group.frontmatter.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
            <div className="column is-4 social"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
