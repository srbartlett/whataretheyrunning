require 'json'
require 'nokogiri'
require 'open-uri'
require 'person'
require 'website'


class Member < Struct.new(:id, :party, :lastname, :firstname)

  def person
    @person ||= Person.find(self)
  end

  def website
    @website ||= Website.find(self)
  end

  def self.still_in_office
    doc = Nokogiri.XML(open('http://data.openaustralia.org/members/representatives.xml'))
    doc.xpath("//member").collect do |member|
      Member.new(member['id'], member['party'], member['lastname'], member['firstname']) if member['towhy'] == 'still_in_office'
    end.compact
  end

  def as_json
    result = { id: id, party: party, lastname: lastname, firstname: firstname }
    result.merge(url: website.url,
                 server: website.server,
                 powered_by: website.powered_by,
                 operating_system: website.operating_system) if website
  end

end
