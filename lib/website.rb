require 'net/http'
require 'uri'
require 'nokogiri'

class Website < Struct.new(:url, :person_id)

  def self.find member
    Website.all.find { |w| w.person_id == member.person.id }
  end

  def server
    http_headers['server'].split('/').first
  rescue
    nil
  end

  def operating_system
    server_header = http_headers['server']
    server_header.downcase.include?('win32') || server_header.downcase.include?('iis') ||
      http_headers['X-Powered-By'] == 'ASP.NET' ? 'Microsoft Windows' : 'Linux'
  rescue
    STDERR.puts "Error: operating system could not be determined for #{url}"
    nil
  end

  def powered_by
    http_headers['X-Powered-By']
  end

  private

  def self.all
    @doc ||= Nokogiri.XML(open('http://data.openaustralia.org/members/websites.xml'))
    @doc.xpath("//personinfo").collect do |info|
      Website.new(info['mp_website'], info['id'])
    end
  end

  def http_headers
    @headers ||= begin
      result = {}
      unless url.nil?
        uri = URI.parse(url)
        Net::HTTP.start(uri.host, uri.port) do |http|
          http.head('/').each { |k, v| result[k] = v }
        end
      end
      STDERR.puts result if ENV['DUMP_HEADERS']
      result
   end
  end
end


