Rails.application.routes.draw do

  devise_for :users, :controllers => { :registrations => "registrations", :omniauth_callbacks => "callbacks" }
  
  devise_scope :user do
    get 'login', to: 'devise/sessions#new'
    get 'signup', to: 'devise/registrations#new'
  end

  root to: "application#home"

  resources :users, only: [:show] 

  resources :events 

  resources :events_users, only: [:new, :create, :destroy]
  
  resources :games do
    get :kid_friendly
    resources :plays, only: [:show, :update]
  end


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
