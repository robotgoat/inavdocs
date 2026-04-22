// docmd.config.js
export default defineConfig({
  // --- Core Metadata ---
  title: 'INAV Documentation',
  url: 'https://inavflight.github.io/',

  // --- Branding ---
  logo: {
    light: 'assets/images/brand/inav_home_light.svg',
    dark: 'assets/images/brand/inav_home_dark.svg',
    alt: 'Logo',
    href: '/',
  },
  favicon: 'assets/images/brand/favicon.ico',

  // --- Source & Output ---
  src: 'docs',
  out: 'site',

  // --- Layout & UI Architecture ---
  layout: {
    spa: true, // Enable seamless page transitions
    header: {
      enabled: true,
    },
    menubar: {
      enabled: true,
      position: 'top',
      left : [
        { type: 'title', text: "INAV", url: '/', icon: "home" },
        { text: "Documentation", url: "/welcome" },
        { text: "Downloads", url: "/downloads" },
      ],
      right: [
        { text: "GitHub", url: "https://github.com/inavflight/inav", icon: "github" },
      ]
    },
    sidebar: {
      collapsible: true,
      defaultCollapsed: false,
    },
    optionsMenu: {
      position: 'menubar', // 'menubar', 'header', 'sidebar-top', 'sidebar-bottom'
      components: {
        search: true,      
        themeSwitch: true, 
        sponsor: null,     
      }
    },
    footer: {
      style: 'minimal', // 'minimal' or 'complete'
      content: '© ' + new Date().getFullYear() + ' Team INAV Flight',
      branding: true    // Config for "Built with docmd" badge
    }
  },

  // --- Theme Settings ---
  theme: {
    name: 'default',        // Options: 'default', 'sky', 'ruby', 'retro'
    appearance: 'system',   // 'light', 'dark', or 'system'
    codeHighlight: true,    
    customCss: [],          
  },

  // --- General Features ---
  minify: true,           
  autoTitleFromH1: true,  
  copyCode: true,         
  pageNavigation: true,   
  
  customJs: [],           

  // Versioning

  versions: {
    position: 'sidebar-top', // 'sidebar-top', 'sidebar-bottom'
    current: 'v9',
    all: [
      { id: 'v9',       // Unique identifier for this version (used in URLs) and matching current version
       dir: 'docs',     // Source directory for latest version
       label: '9.0.1'
      },
      { id: 'v4',
       dir: 'docs-v4',  // Source directory for older version
       label: '4.0'
      }
    ]
  },

  // --- Navigation (Sidebar) ---
  navigation: [
    { title: 'Welcome', path: '/welcome', icon: 'plane' },
  ],

  // --- Plugins ---
  plugins: {
    seo: {
      defaultDescription: 'Documentation built with docmd.',
      openGraph: { defaultImage: '' },
      twitter: { cardType: 'summary_large_image' }
    },
    sitemap: { defaultChangefreq: 'weekly' },
    analytics: { 
      googleV4: { measurementId: '' } // Change the example GA ID with your own
    }
  },
  
  // --- Edit Link ---
  editLink: {
    enabled: false,
    baseUrl: 'https://github.com/USERNAME/REPO/edit/main/docs',
    text: 'Edit this page'
  }
});
