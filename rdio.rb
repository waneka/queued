module Rdio
  # usage: Rdio.query("song you want")
  extend self

  require 'net/http'
  require 'oauth'


  def new
    consumer = OAuth::Consumer.new('5vksezmfkbg434a8rdzyn5kn', 'M7FQUUnemf', {
      :site   => 'http://api.rdio.com',
      :scheme => :header
      })
  end
  def query(song)
    consumer = self.new
    song = URI.encode(song)
    resp = consumer.request(:post, '/1/search', nil, {}, "method=search&query=#{song}&types=tracks&count=25", { 'Content-Type' => 'application/x-www-form-urlencoded' })
    resp.body
  end
end

if $0 == __FILE__
  puts "Creating Oauth signature.."
  search_term = ARGV.join(" ")
  puts "Querying Rdio with #{search_term}... "
  puts ""
  result =  Rdio.query(search_term)
  puts result
end