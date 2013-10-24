require 'spec_helper'

  feature "Playlist Creator signs in and" do
    let(:user) {User.create}
    
    scenario "sees Create Party button" do
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
      Rdio.stub(:query).and_return(crazyAssThing)
      stub_current_user(user)
      visit new_party_path
      click_button 'Create Party!'
      fill_in('search-input-term', :with => 'californication')
      click_button('Search')
      expect(page).to have_content('Californication')
    end
    
    # scenario "can vote on a song" do
    #   Rdio.stub(:query).and_return(crazyAssThing)
    #   stub_current_user(user)
    #   visit new_party_path
    #   click_button 'Create Party!'
    #   fill_in('search-input-term', :with => 'californication')
    #   click_button('Search')
      
    #   expect(page).to have_content('Californication')
    end
  
  end


  

  feature "Playlist persists on reload"
  feature "Playlist song autoplays when added to empty playlist"

  feature "Visitor joins a playlist"
  feature "Visitor adds a song to the queue"
  feature "Visitor can vote on a song"
