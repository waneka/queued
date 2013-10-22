class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :signed_in?, :current_user

  private
  def signed_in?
    current_user ||= nil
  end

  def current_user
    current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end
