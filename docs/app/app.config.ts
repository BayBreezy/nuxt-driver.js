const repoBase = "https://github.com/BayBreezy/nuxt-driver.js";

export default defineAppConfig({
  docd: {
    github: {
      repo: repoBase,
      contentDir: "docs/content",
    },
    ui: {
      expandNav: true,
      header: {
        title: "Nuxt Driver.js",
        logo: {
          alt: "Nuxt Driver.js Logo",
          dark: "/driver-head.svg",
          light: "/driver-head.svg",
        },
      },
      extraLinks: [
        {
          label: "Star on GitHub",
          icon: "lucide:star",
          external: true,
          href: repoBase,
        },
        {
          icon: "lucide:bug",
          label: "Report an issue",
          external: true,
          href: `${repoBase}/issues/new?template=bug_report.yml`,
        },
        {
          icon: "lucide:lightbulb",
          label: "Feature request",
          external: true,
          href: `${repoBase}/issues/new?template=feature_request.yml`,
        },
        {
          icon: "lucide:coffee",
          label: "Buy me coffee",
          external: true,
          href: "https://buymeacoffee.com/llehXIrI8g",
        },
      ],
    },
  },
  seo: {
    title: "Nuxt Driver.js",
    description: "Nuxt module for Driver.js",
    titleTemplate: "%s | Nuxt Driver.js",
  },
});
