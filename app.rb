require 'oauth'
require "sinatra"
require 'json'
require 'net/http'
require './rdio'

get '/' do

  SONG_KEYS = %w{t12t1259537 t1259409 t1259319 t1259449 t1259361}

  erb :layout
end

post '/query' do
  song_search = params[:song_name]
  response = Rdio.query(song_search)
  "#{JSON.parse(response)['result']['results']}"
  # "#{JSON.parse(response)['result']['results'].first['key']}"
  # erb :layout
end

