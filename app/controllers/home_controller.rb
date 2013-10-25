class HomeController < ApplicationController
  def index
  	@party = Party.new(password: "From Hipster Ipsum")
  end
end