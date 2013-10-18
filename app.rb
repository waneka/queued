require 'oauth'
require "sinatra"
require 'json'
require 'net/http'
require './rdio'

get '/' do


  erb :layout
end

post '/query' do
  song_search = params[:song_name]
  response = Rdio.query(song_search)
  "#{JSON.parse(response)['result']['results']}"
  # "#{JSON.parse(response)['result']['results'].first['key']}"
  # erb :layout
end