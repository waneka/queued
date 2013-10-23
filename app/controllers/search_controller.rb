class SearchController < ApplicationController
  include Rdio
  def create
    response = Rdio.query(params[:song])
    json = response.to_json
    puts json
    render :json => json
  end
end