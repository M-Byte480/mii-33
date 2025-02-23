Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  get "/find", to: "meetings#find_slot"
  post "/chat", to: "chat#recommend"
  get "/auth_test", to: "auth_test#test"

  post "/users", to: "users#create"
  post "/auth/google", to: "session#google_auth"

  resources :guests, only: [ :index, :show, :create, :update, :destroy ]

  # Defines the root path route ("/")
  # root "posts#index"
end
