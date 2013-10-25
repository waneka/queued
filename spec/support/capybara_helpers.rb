module CapybaraHelpers
  def stub_current_user(user)
  	ApplicationController.any_instance.stub(:current_user).and_return user
  end
end