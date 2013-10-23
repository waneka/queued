require 'spec_helper'

  feature "Playlist Creator signs in" do
  	let(:user) {User.create}
  	
  	scenario "and sees Host Party button" do
			stub_current_user(user)
  		visit new_party_path

  		expect(page).to have_selector("input[value='Create Party!']")
  	end  	
  	
  	scenario "creates a playlist" do
  		stub_current_user(user)
  		visit new_party_path

  		click_button 'Create Party!'
  		expect(page).to have_selector("div[id='player']")
  	end

	  scenario "search returns correct results", js: true do
	  	stub_current_user(user)
	  	visit new_party_path
	  	click_button 'Create Party!'
	  	within(".search-container") do
	  		#need a label or id for fill
	  		fill_in 'search-input-term', :with => 'Superheroes'
	  	end
	  	click_button 'Search'
	  	expect(page).to have_content('Superheroes')
	  end
  end


  feature "Playlist Creator can vote on a song"
  

  feature "Playlist persists on reload"
  feature "Playlist song autoplays when added to empty playlist"

  feature "Visitor joins a playlist"
  feature "Visitor adds a song to the queue"
  feature "Visitor can vote on a song"

