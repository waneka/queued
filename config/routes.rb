Qd::Application.routes.draw do
  root to: 'home#index'
  resource :search, only: [:create, :new], controller: 'search'
  resources :parties, only: [:create, :show]

  get '/create_party/:id', to: 'parties#create_party', as: :hella_party

  get '/auth/:provider/callback', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'

end
