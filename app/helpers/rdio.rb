module Rdio
  # usage: Rdio.query("song you want")
  extend self

  def new
    consumer = OAuth::Consumer.new(ENV['RDIO_CONSUMER_KEY'], ENV['RDIO_CONSUMER_SECRET'], {
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