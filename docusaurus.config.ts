import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "INAV",
  tagline: "Exploring the limits of navigation enhanced UAV Functionality",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://robotgoat.github.io/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/inavdocs/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "inavflight", // Usually your GitHub org/user name.
  projectName: "inavdocs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [require.resolve("docusaurus-lunr-search")],
  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },
  
  presets: [
    [
      "classic",
      {
        docs: {
          includeCurrentVersion: true,
          lastVersion: 'current',
          versions : {
            current: {
              label: "8.0.0",
              banner: 'none'
            }
          },
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/inav_social_card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'the_news',
      content: '<a href="https://github.com/iNavFlight/inav/releases">🎉 INAV 8.0.0 is out now! 🎉</a>',
      backgroundColor: '#ff9999',
      isCloseable: true,
    },
    navbar: {
      title: "INAV",
      // style: 'primary',
      logo: {
        alt: "INAV Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "documentationSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          to: "/download",
          label: "Download",
          position: "left"
        },
        { to: "/blog",
          label: "Blog", 
          position: "left" 
        },
        {
          to: "/about",
          label: "About",
          position: "left"
        },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownActiveClassDisabled: true
        },
        {
          href: "https://github.com/iNavFlight/inav",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    docs: {
      versionPersistence: 'localStorage',
      sidebar : {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    footer: {
      // style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Documentation",
              to: "/docs/welcome",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Github Discussions",
              href: "https://github.com/iNavFlight/inav/discussions",
            },
            {
              label: "Discord",
              href: "https://discord.gg/peg2hhbYwN",
            },
            {
              label: "Facebook",
              href: "https://www.facebook.com/groups/INAVOfficial",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/iNavFlight/inav",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Team INAV Flight`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
