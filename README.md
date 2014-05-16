# xpathpal.com [![Build Status](https://travis-ci.org/ejhayes/xpathpal.com.png?branch=master)](https://travis-ci.org/ejhayes/xpathpal.com) [![Code Climate](https://codeclimate.com/github/ejhayes/xpathpal.com.png)](https://codeclimate.com/github/ejhayes/xpathpal.com)

Both regexpal.com and rubular.com are great resources for regular expressions, but the existing sites out there
are not really all that great for XPath.  This is my first stab at making it easier to learn and interact with
XPath since the feedback is done in realtime rather than clicking submit, waiting, and wondering what the heck
actually happened.

## Getting started

To get started run the following:

    bundle

And you are good to go

## Example usage

    require 'xpather'

    doc = XPather.new <<-EOF
    <?xml version="1.0" encoding="utf-8"?>
    <configuration>
      <configSections>
        <sectionGroup name="WAFwebComponents">
          <section name="metastore" type="System.Configuration.SingleTagSectionHandler, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=121212"/>
          <section name="switches" type="System.Configuration.NameValueSectionHandler, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=121212"/>
        </sectionGroup>
        <sectionGroup name="BLAH">
          <section name="websites" type="BLAH.Common.WebsitesConfigurationSection, BLAH.Common"/>
          <section name="assets" type="System.Configuration.NameValueSectionHandler, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=121212" requirePermission="false" />
        </sectionGroup>
        <!-- ASP.NET MVC -->
        <!-- For more information on Entity Framework configuration, visit http://go.microsoft.com/fwlink/?LinkID=237468 -->
        <section name="entityFramework" type="System.Data.Entity.Internal.ConfigFile.EntityFrameworkSection, EntityFramework, Version=5.0.0.0, Culture=neutral, PublicKeyToken=121212" requirePermission="false" />
      </configSections>
    </configuration>
    EOF

And then explore stuff:

    irb(main):031:0> doc.search("/configuration/configSections/sectionGroup/section[name]")
    => []
    irb(main):032:0> doc.search("/configuration/configSections/sectionGroup/section[@name]")
    => ["<section name=\"metastore\" type=\"System.Configuration.SingleTagSectionHandler, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=121212\"/>", "<section name=\"switches\" type=\"System.Configuration.NameValueSectionHandler, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=121212\"/>", "<section name=\"websites\" type=\"STORM.Common.WebsitesConfigurationSection, STORM.Common\"/>", "<section name=\"assets\" type=\"System.Configuration.NameValueSectionHandler, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=121212\" requirePermission=\"false\"/>"]
    irb(main):033:0> doc.search("/configuration/configSections/sectionGroup/section[@name]/name")
    => []
    irb(main):034:0> doc.search("/configuration/configSections/sectionGroup/section[@name]/@name")
    => [" name=\"metastore\"", " name=\"switches\"", " name=\"websites\"", " name=\"assets\""]
    irb(main):035:0> doc.search("/configuration/configSections/sectionGroup/section/@name")
    => [" name=\"metastore\"", " name=\"switches\"", " name=\"websites\"", " name=\"assets\""]
    irb(main):036:0> doc.get("/configuration/configSections/sectionGroup/section/@name")
    => ["metastore", "switches", "websites", "assets"]
    irb(main):037:0> doc.get("/configuration/configSections/sectionGroup/section")
    => ["", "", "", ""]
    irb(main):038:0> doc.get("/configuration/configSections/sectionGroup/section/@all")
    => nil
    irb(main):039:0> doc.get("/configuration/configSections/sectionGroup/section/@value")
    => nil
    irb(main):040:0> doc.get("/configuration/configSections/sectionGroup/section/@type")
    => ["System.Configuration.SingleTagSectionHandler, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=121212", "System.Configuration.NameValueSectionHandler, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=121212", "BLAH.Common.WebsitesConfigurationSection, BLAH.Common", "System.Configuration.NameValueSectionHandler, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089"]
    irb(main):041:0> doc.search("/configuration/configSections/sectionGroup/section/@type")
    => [" type=\"System.Configuration.SingleTagSectionHandler, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089\"", " type=\"System.Configuration.NameValueSectionHandler, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089\"", " type=\"BLAH.Common.WebsitesConfigurationSection, BLAH.Common\"", " type=\"System.Configuration.NameValueSectionHandler, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=121212\""]

And an example

    #!/usr/bin/ruby -w

    require 'rexml/document'
    include REXML

    xmlfile = File.new("movies.xml")
    xmldoc = Document.new(xmlfile)

    # Now get the root element
    root = xmldoc.root
    puts "Root element : " + root.attributes["shelf"]

    # This will output all the movie titles.
    xmldoc.elements.each("collection/movie"){ 
       |e| puts "Movie Title : " + e.attributes["title"] 
    }

    # This will output all the movie types.
    xmldoc.elements.each("collection/movie/type") {
       |e| puts "Movie Type : " + e.text 
    }

    # This will output all the movie description.
    xmldoc.elements.each("collection/movie/description") {
       |e| puts "Movie Description : " + e.text 
    }