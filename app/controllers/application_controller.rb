class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :signed_in?, :current_user, :body_class, :render_toggle

  private

  def body_class
    if request.path == '/' or request.path == '/party/join'
      'home'
    else
      ""
    end
  end

  def render_toggle
    request.path != '/' and request.path != '/parties/new' and request.path != '/party/join'
  end

  def signed_in?
    !current_user.nil?
  end

  def current_user
    current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end
