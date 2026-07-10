#!/usr/bin/env ruby
# frozen_string_literal: true

require "pathname"
require "rexml/document"

ROOT = Pathname.new(__dir__).parent
SITE = Pathname.new(ARGV.fetch(0, ROOT.join("_site").to_s)).expand_path
errors = []

required_files = %w[
  index.html
  about/index.html
  cv/index.html
  publications/index.html
  projects/index.html
  blog/index.html
  notes/index.html
  talks/index.html
  teaching/index.html
  experience/index.html
  education/index.html
  awards/index.html
  service/index.html
  contact/index.html
  404.html
  feed.xml
  sitemap.xml
  robots.txt
  assets/css/main.css
  assets/js/main.min.js
  assets/js/site.js
  files/cv.pdf
]

required_files.each do |relative|
  path = SITE.join(relative)
  errors << "missing #{relative}" unless path.file? && path.size.positive?
end

%w[feed.xml sitemap.xml].each do |relative|
  path = SITE.join(relative)
  next unless path.file?

  REXML::Document.new(path.read)
rescue REXML::ParseException => e
  errors << "#{relative} is invalid XML: #{e.message.lines.first.strip}"
end

index = SITE.join("index.html").read if SITE.join("index.html").file?
if index
  errors << "home page is missing its canonical URL" unless index.include?('<link rel="canonical" href="https://zhaoyizhang-ai.github.io/">')
  errors << "home page is missing Open Graph metadata" unless index.include?('property="og:title"') && index.include?('property="og:image"')
  errors << "home page is missing Twitter Card metadata" unless index.include?('name="twitter:card"')
  errors << "home page is missing the skip link" unless index.include?('class="skip-link"')
  errors << "empty email rendered as a mailto link" if index.include?("mailto:")
  errors << "Giscus loaded while disabled" if index.include?("giscus.app/client.js")
  errors << "analytics loaded while disabled" if index.include?("googletagmanager.com") || index.include?("plausible.io/js")
  title_text = index[/<title>(.*?)<\/title>/i, 1].to_s
  errors << "display-name placeholder was emitted as an HTML element in the title" if title_text.match?(/<display_name>/i)
end

robots = SITE.join("robots.txt").read if SITE.join("robots.txt").file?
errors << "robots.txt is missing the absolute sitemap URL" if robots && !robots.include?("https://zhaoyizhang-ai.github.io/sitemap.xml")

not_found = SITE.join("404.html").read if SITE.join("404.html").file?
errors << "404 page is missing recovery links" if not_found && (!not_found.include?("Return home") || !not_found.include?("Browse the blog"))

feed = SITE.join("feed.xml").read if SITE.join("feed.xml").file?
errors << "RSS feed has no entries" if feed && !feed.include?("<entry>")

visitor_html = Dir.glob(SITE.join("**/*.html")).map { |path| File.read(path) }.join("\n")
forbidden_patterns = [
  /Red\s+Brick\s+University/i,
  /none@(?:example)\.org/i,
  /PS_CX0A{5}J/,
  /yourorcid(?:url)/i,
  /bio-(?:photo)(?:-2)?\.jpg/i,
  /Paper\s+Title\s+Number\s+\d/i,
  /Journal\s+\d/i
]
forbidden_patterns.each do |pattern|
  errors << "generated site contains removed template identity data matching #{pattern.inspect}" if visitor_html.match?(pattern)
end

unless errors.empty?
  warn "Build verification failed:"
  errors.each { |error| warn "  - #{error}" }
  exit 1
end

puts "Build verification passed (pages, assets, SEO, 404, RSS, sitemap, and disabled integrations)."
