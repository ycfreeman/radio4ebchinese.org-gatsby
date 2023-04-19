import React, { useState, useCallback, useMemo } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import useSiteMetadata from "./SiteMetadata";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Navbar = () => {
  const data = useStaticQuery(graphql`query NavbarGroupsQuery {
  allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "group"}}}) {
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
  logo: file(relativePath: {eq: "logo.png"}) {
    childImageSharp {
      gatsbyImageData(width: 203, height: 80, placeholder: NONE, layout: FIXED)
    }
  }
}`);

  const { edges: groups } = data.allMarkdownRemark;

  const { title } = useSiteMetadata();

  const [active, setActive] = useState(false);

  const navBarActiveClass = useMemo(() => {
    if (active) return "is-active";
    return "";
  }, [active]);

  const toggleHamburger = useCallback(() => {
    setActive(!active);
  }, [active, setActive]);

  const logo = getImage(data.logo);

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Home">
            <GatsbyImage image={logo} loading="eager" alt={title} />
          </Link>
          {/* Hamburger menu */}
          <div
            className={`navbar-burger burger ${navBarActiveClass}`}
            data-target="navMenu"
            onClick={() => toggleHamburger()}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="navMenu" className={`navbar-menu ${navBarActiveClass}`}>
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to="/news">
              最新動態 | News
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">節目組 | Groups </a>
              <div className="navbar-dropdown">
                {groups.map(({ node: group }) => {
                  return (
                    <Link
                      key={`navbar-group-${group.fields.slug}`}
                      className="navbar-item"
                      to={group.fields.slug}
                    >
                      {group.frontmatter.title}
                    </Link>
                  );
                })}
              </div>
            </div>
            <OutboundLink className="navbar-item"
              href="https://www.4eb.org.au/guide"
              target="_blank"
              rel="noreferrer"
            >
              時間表 | Programme Timetable
            </OutboundLink>
            <OutboundLink
              className="navbar-item"
              href="https://www.4eb.org.au/"
              target="_blank"
              rel="noreferrer"
            >
              Listen on 4EB
            </OutboundLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
