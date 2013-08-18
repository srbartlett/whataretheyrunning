require 'nokogiri'

class Person < Struct.new(:id, :member_id)

  def self.find member
    Person.all.find { |p| p.member_id == member.id }
  end

  private

  def self.all
    @doc ||= Nokogiri.XML(open('http://data.openaustralia.org/members/people.xml'))
    @doc.xpath("//person").collect do |person|
      id = person['id']
      member = person.xpath("./office[@current='yes']").collect do |office|
        office['id'] if office['id'].include?('member')
      end.compact
      Person.new(id, member.first)
    end
  end
end

