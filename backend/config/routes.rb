Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  get "/find", to: "meetings#find_slot"
  get "/chat", to: "chat#ask"

  post "/users", to: "users#create"
  post "/auth/google", to: "sessions#google_auth"



  # Defines the root path route ("/")
  # root "posts#index"
end
