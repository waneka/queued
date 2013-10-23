Qd::Application.routes.draw do
  root to: 'home#index'

  resource :search, only: [:create, :new], controller: 'search', defaults: {format: :json}

  resources :parties, only: [:create, :show, :new, :index]
  get '/party/join', to: 'parties#join'
  get '/party/search', to: 'parties#search'

  get '/auth/:provider/callback', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'

end
