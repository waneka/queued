FactoryGirl.define do
	factory :party do 
		password 'password'
		user_id '1'
		url 'test'
	end

	factory :user do
		first_name 'Batman'
	end
end