Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  post "/find", to: "meetings#find_slots"
  post "/createevent", to: "meetings#create_event"
  post "/chat/recommend", to: "chat#recommend"
  post "/chat/analysis", to: "chat#analysis"
  get "/auth_test", to: "auth_test#test"
  get "/metrics", to: "metrics#get_metrics"
  post "/users", to: "users#create"
  post "/auth/google", to: "session#google_auth"

  resources :employees do
    resources :employee_feedbacks, only: [ :index, :show, :create, :update, :destroy ]
  end

  resources :metrics, only: [ :index, :show, :create, :update, :destroy ]

  # Defines the root path route ("/")
  # root "posts#index"
end
