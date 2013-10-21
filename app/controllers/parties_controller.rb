class PartiesController < ApplicationController

  def create_party
    @party = Party.new
    @party.user_id = params[:id]
    @party.url = SecureRandom.urlsafe_base64
    @party.password = Faker::Lorem.words(1)
    @party.save
    render :text => @party.id
  end

  def show

  end
end
