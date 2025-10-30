export const metadata = {
  title: "BlogNest - Premium Blogging Platform",
  description: "BlogNest is your go-to platform for curated, high-quality blog posts.",
  keywords: "blog, tech, programming, lifestyle, articles, news",
  author: "BlogNest Team",
  siteUrl: "https://www.yourblognest.com",
};

export default function Head() {
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      <meta name="author" content={metadata.author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph */}
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metadata.siteUrl} />
      <meta property="og:image" content="/og-image.png" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={metadata.siteUrl} />
    </>
  );
}
