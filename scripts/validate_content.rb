#!/usr/bin/env ruby
# frozen_string_literal: true

require "date"
require "pathname"
require "psych"

ROOT = Pathname.new(__dir__).parent
errors = []

def load_yaml(path)
  Psych.safe_load(
    path.read,
    permitted_classes: [Date, Time],
    permitted_symbols: [],
    aliases: true,
    filename: path.to_s
  )
end

def front_matter(path)
  text = path.read
  return nil unless text.start_with?("---\n")

  closing = text.index("\n---\n", 4)
  raise "missing closing front matter delimiter" unless closing

  yaml = text[4...closing]
  Psych.safe_load(
    yaml,
    permitted_classes: [Date, Time],
    permitted_symbols: [],
    aliases: true,
    filename: path.to_s
  ) || {}
end

Dir.glob(ROOT.join("**/*.{yml,yaml}")).sort.each do |filename|
  next if filename.include?("/vendor/") || filename.include?("/_site/")

  path = Pathname.new(filename)
  load_yaml(path)
rescue Psych::Exception => e
  errors << "#{path.relative_path_from(ROOT)}: invalid YAML (#{e.message.lines.first.strip})"
end

Dir.glob(ROOT.join("{_pages,_posts,_notes,_drafts}/**/*.{md,markdown,html}")).sort.each do |filename|
  path = Pathname.new(filename)
  front_matter(path)
rescue StandardError, Psych::Exception => e
  errors << "#{path.relative_path_from(ROOT)}: invalid front matter (#{e.message.lines.first.strip})"
end

navigation = load_yaml(ROOT.join("_data/navigation.yml"))
navigation.fetch("main", []).each do |item|
  errors << "_data/navigation.yml: #{item['key']} enabled must be true or false" unless [true, false].include?(item["enabled"])
  errors << "_data/navigation.yml: #{item['key']} is missing a URL" if item["url"].to_s.empty?
end

expected_navigation = %w[home about cv publications projects blog notes talks teaching experience education awards service contact]
actual_navigation = navigation.fetch("main", []).map { |item| item["key"] }
missing_navigation = expected_navigation - actual_navigation
errors << "_data/navigation.yml: missing keys #{missing_navigation.join(', ')}" unless missing_navigation.empty?

projects = load_yaml(ROOT.join("_data/projects.yml")) || []
allowed_statuses = ["Planned", "In Progress", "Completed", "Archived"]
projects.each_with_index do |project, index|
  label = "_data/projects.yml entry #{index + 1}"
  %w[id name short_description description status tech_stack tags featured example].each do |key|
    errors << "#{label}: missing #{key}" unless project.key?(key)
  end
  errors << "#{label}: invalid status #{project['status'].inspect}" unless allowed_statuses.include?(project["status"])
  if !project["image"].to_s.empty? && project["image_alt"].to_s.strip.empty?
    errors << "#{label}: image_alt is required when image is set"
  end
  if project["example"] == true && !project["short_description"].to_s.include?("Example content")
    errors << "#{label}: example projects need the standard warning"
  end
end

publications = load_yaml(ROOT.join("_data/publications.yml")) || []
publications.each_with_index do |publication, index|
  label = "_data/publications.yml entry #{index + 1}"
  %w[id title authors year venue abstract type selected example bibtex].each do |key|
    errors << "#{label}: missing #{key}" unless publication.key?(key)
  end
  errors << "#{label}: authors must be a non-empty array" unless publication["authors"].is_a?(Array) && !publication["authors"].empty?
  Array(publication["authors"]).each_with_index do |author, author_index|
    errors << "#{label}: author #{author_index + 1} needs name, order, and boolean self" unless
      author["name"] && author["order"] && [true, false].include?(author["self"])
  end
  if !publication["cover"].to_s.empty? && publication["cover_alt"].to_s.strip.empty?
    errors << "#{label}: cover_alt is required when cover is set"
  end
  if publication["example"] == true && !publication["abstract"].to_s.include?("Example content")
    errors << "#{label}: example publications need the standard warning"
  end
end

profile = load_yaml(ROOT.join("_config.yml")).fetch("profile")
social_urls = profile.fetch("social", {})
social_urls.each do |key, value|
  next if value.to_s.empty?

  errors << "_config.yml: #{key} must use an HTTPS URL" unless value.start_with?("https://")
  errors << "_config.yml: #{key} contains a placeholder" if value.include?("<") || value.include?("TODO")
end
if !profile["email"].to_s.empty? && !profile["email"].match?(/\A[^\s@]+@[^\s@]+\.[^\s@]+\z/)
  errors << "_config.yml: profile.email is not a valid email address"
end

required_pages = %w[home about cv publications projects blog notes talks teaching experience education awards service contact 404]
page_files = Dir.glob(ROOT.join("_pages/*.{md,html}")).map { |path| File.basename(path, File.extname(path)) }
missing_pages = required_pages - page_files
errors << "_pages: missing #{missing_pages.join(', ')}" unless missing_pages.empty?

example_documents = Dir.glob(ROOT.join("{_posts,_notes}/**/*.md"))
example_documents.each do |filename|
  path = Pathname.new(filename)
  metadata = front_matter(path) || {}
  next unless metadata["example"] == true

  unless path.read.include?("Example content — replace or delete before publishing.")
    errors << "#{path.relative_path_from(ROOT)}: missing the standard example warning"
  end
end

unless errors.empty?
  warn "Content validation failed:"
  errors.each { |error| warn "  - #{error}" }
  exit 1
end

puts "Content validation passed (YAML, front matter, schemas, navigation, and placeholders)."
