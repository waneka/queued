class SearchController < ApplicationController
  include Rdio
  def create

    response = Rdio.query(params[:song])
    render :json => response.to_json
  end
end