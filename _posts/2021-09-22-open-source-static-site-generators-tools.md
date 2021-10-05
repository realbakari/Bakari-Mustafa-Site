---
title: Open Source Static Site Generators Tools
date: 2021-09-22 14:00:00 +0000
tags:
- "‎Headless CMS"
- Static Site Generator
- " ‎Static Site Boilerplate"
- "‎React Static"
description: Looking to deploy a static web-page? No need to fool around with HTML
  and CSS. These open source static website generators will help you deploy beautiful,
  functional static websites in no time.
image: "/uploads/static-site-generator.png"

---
### Jekyll

Jekyll is one of the most popular open source static generator built using [Ruby](https://www.ruby-lang.org/en/). In fact, Jekyll is the engine behind [GitHub pages](https://pages.github.com/) which lets you host websites using GitHub for free.

Setting up Jekyll is easy across multiple platforms which includes Ubuntu as well. It utilizes [Markdown](https://github.com/Shopify/liquid/wiki), [Liquid](https://github.com/Shopify/liquid/wiki) (for template), HTML, and CSS to generate the static site files. It is also a pretty good option if you want to build a blog without advertisements or a product page to promote your tool or service.

Also, it supports migrating your blog from popular CMSs like Ghost, WordPress, Drupal 7, and more. You get to manage permalinks, categories, pages, posts, and custom layouts, which is nice. So, even if you already have an existing website that you want to convert to a static site, Jekyll should be a perfect solution. 

Learning Jekyll:

* [Getting Started documentation](https://jekyllrb.com/docs/)
* [Getting Started with Jekyll and GitHub Pages: Your First Website](https://www.aleksandrhovhannisyan.com/blog/getting-started-with-jekyll-and-github-pages/)
* [How to Create a Jekyll Site from Scratch](https://sayzlim.net/create-jekyll-site-beginners/)

You can learn more about it by exploring the [official documentation](https://jekyllrb.com/docs/) or its [GitHub page](https://github.com/jekyll/jekyll).

### Hugo

Hugo is on the easier end of the terminal-based static site generators to set up and use. Their documentation, especially on [how to install Hugo](https://gohugo.io/getting-started/installing/#windows) and get it running, is quite comprehensive and it doesn’t need you to install a new package store first and then install Hugo from.

It has a large amount of [prebuilt themes](https://themes.gohugo.io/) which makes it easier to pick and choose the look you want for your site, and one of the key features that the Hugo team has is its build-speed.

Making a change to your site by adding or editing content, or changing the theme, requires that you “rebuild” the site: that is, run through the process of combining content with a theme into HTML, for every page. Even a small difference in build-speed performance can make the difference between you waiting seconds and you waiting minutes to see the result of a change that you’ve made, and Hugo works hard on being the fastest at this.

If you’re building a site from existing data, then Hugo’s “[Data-Driven Content](https://gohugo.io/templates/data-templates/#data-driven-content)” feature makes it relatively easy to have the content of the site being provided in CSV or JSON formats. This can be a useful way to take some existing data that you wish to expose to the world in a more convenient fashion that they can browse and navigate through without needing to fire up Excel or Google Sheets.

Learning Hugo:

* [Getting Started documentation](https://gohugo.io/getting-started/)
* [Tutorial: Use Hugo to Generate a Static Website](https://thenewstack.io/tutorial-use-hugo-to-generate-a-static-website/)
* [Noobs guide to starting a website on Hugo](https://levelup.gitconnected.com/build-your-personal-moats-noobs-guide-to-starting-a-website-on-hugo-5ba40b64f2a7)

### Eleventy, or 11ty

11ty is one of the newer SSGs but is rocketing up the popularity list. It bills itself as “a simpler static site generator”. However, it does require a reasonable amount of technical familiarity (and its documentation reflects this) but for those who can grasp it, it does things in an elegant way.

Learning Eleventy:

* [Getting Started with Eleventy documentation](https://www.11ty.dev/docs/getting-started/)
* [Beginner's Guide to Eleventy](https://tatianamac.com/posts/beginner-eleventy-tutorial-parti/)
* [Building an Eleventy Boilerplate](https://thefrugaldeveloper.life/posts/building-an-eleventy-boilerplate-pt-1/)

### Publii

[Publii ](https://getpublii.com/)is an impressive open-source CMS that makes it easy to generate a static site. It’s built using [Electron](https://www.electronjs.org/) and Vue.js. You can also migrate your posts from a WordPress site if needed. In addition to that, it offers several one-click synchronizations with GitHub Pages, Netlify, and similar services.

You also get a WYSIWYG editor if you utilize [Publii ](https://getpublii.com/)to generate a static site. To get started, visit the [official website](https://getpublii.com/) to download it or explore its [GitHub page](https://github.com/GetPublii/Publii) for more information.

### Hexo

Hexo is an interesting open-source framework powered by [Node.js](https://nodejs.org/en/). Similar to others, you will end up creating blazing fast websites but you will also get a good collection of themes and plugins.

You do get a powerful API here to extend functionality as per your requirements as well. If you already have a website, you can simply use its [Migrator](https://hexo.io/api/migrator.html) extension as well.

To get started, you can go through the [official documentation](https://hexo.io/docs/) or just explore their [GitHub page](https://github.com/hexojs/hexo).

### Gatsby

Gatsby is an increasingly open-source popular site generator framework. It utilizes [React.js](https://reactjs.org/) for creating fast and beautiful websites.

I was quite interested to give this a try for some experimental projects a few years back and it is impressive to see the availability thousands of new plugins and themes. Unlike other static site generators, you can use Gatsby to generate a site and get the benefits of static sites without losing any features.

It offers a lot of useful integrations from popular services. Of course, you can keep it simple or use it coupled with a popular CMS of your choice, which should be interesting. You can take a look at their [official documentation](https://www.gatsbyjs.com/docs/) and its [GitHub page](https://github.com/gatsbyjs/gatsby) to find out more on it.

Learning Gatsby:

* [Getting Started Documentation](https://www.gatsbyjs.com/docs/tutorial/)
* [Getting Started with Gatsby: Build Your First Static Site](https://www.sitepoint.com/gatsby-guide/)
* [How To Set Up Your First Gatsby Website](https://www.digitalocean.com/community/tutorials/how-to-set-up-your-first-gatsby-website)

### VuePress

VuePress is a static site generator powered by [Vue.js](https://vuejs.org/) which happens to be an open-source progressive JavaScript framework.

If you know HTML, CSS, and JavaScript, you can easily get started using VuePress. You should find several useful plugins and themes to get a head start on building your site. Also, it seems like Vue.js is being actively improved and has the attention of more developers, which is a good thing.

You can learn more about it through their [official guide](https://vuepress.vuejs.org/guide/) and the [GitHub page](https://github.com/vuejs/vuepress).

### Nuxt.js

Nuxt.js utilizes Vue.js and Node.js but it focuses on providing modularity and has the ability to rely on the server-side instead of the client-side. Not just that, it aims to provide an intuitive experience to the developers with descriptive errors, and detailed documentations among other things.

Building upon those improvements, Nuxt also [improved their static build time](https://nuxtjs.org/blog/nuxt-static-improvements) by allowing builds to be generated off of a build cache when only content has changed, meaning it can skip the full webpack build. This can yield dramatic decreases in build times wherever you deploy your app.

Learning Nuxt:

* [Getting Started documentation](https://nuxtjs.org/docs/2.x/get-started/installation)
* [Getting Started with Nuxt](https://www.smashingmagazine.com/2020/04/getting-started-nuxt/)
* [Getting Started with Nuxt.js](https://dev.to/lauragift21/getting-started-with-nuxt-js-1368)

You can explore its [GitHub page](https://github.com/nuxt/nuxt.js) or visit the [official site](https://nuxtjs.org/) to get more details.

### Gridsome

[Gridsome ](https://gridsome.org/)is another popular JavaScript-based SSG that uses the Vue framework. In many ways, like Nuxt.js is to Next.js, Gridsome is to Gatsby, offering features like a plugin architecture, GraphQL support, and others that bring a Gatsby-like experience to the Vue ecosystem.

### Bridgetown

[Bridgetown ](https://www.bridgetownrb.com/)is a new SSG this year. It started as a fork of Jekyll that aims to bring modern web development tools and practices like the use of Webpack, Post CSS, and npm.

### Scully 

While there have been multiple React and Vue-based static site generators, until [Scully ](https://scully.io/)was released in late 2019, there was no Angular-based option.

#### Things to consider when choosing an SSG

As you may have seen from the descriptions, each of the options listed here is quite different. To pick the best static site generator, it's best to narrow your options based on your own preferences. A little research goes a long way. They will all get the job done. Nonetheless, here are some guidelines to help you make a choice.