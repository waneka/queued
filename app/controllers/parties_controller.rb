class PartiesController < ApplicationController
  include PasswordHelper

  def create
    @party = Party.new
    @party.user_id = current_user.id
    @party.url = SecureRandom.urlsafe_base64
    @party.password = generatePassword
    @party.save
    redirect_to party_path(@party)
  end

  def show
    @party = Party.find(params[:id])
    @alert_fire = true
  end

  def new
    @parties = Party.find_all_by_user_id(current_user.id)
  end

  def join
  end

  def search
    @party = Party.find_by_password(params[:password])
    if @party
      redirect_to party_path(@party)
    else
      redirect_to :back
    end
  end

end




