# app/controllers/sessions_controller.rb
class SessionsController < ApplicationController
  # Skip authorization for this action since it’s the entry point
  skip_before_action :authorize_request, only: :google_auth

  def google_auth
    # Expect the Google JWT to be sent in the request body as { token: "..." }
    token = params[:token]

    # Validate the token using google-id-token gem
    validator = GoogleIDToken::Validator.new
    begin
      payload = validator.check(token, ENV["GOOGLE_CLIENT_ID"])
    rescue GoogleIDToken::ValidationError => e
      render json: { error: "Invalid token: #{e.message}" }, status: :unauthorized and return
    end

    # Extract user info from the token payload
    email      = payload["email"]
    first_name = payload["given_name"] || ""
    last_name  = payload["family_name"] || ""

    # Find or create the user based on their email
    user = User.find_or_create_by(email: email) do |u|
      u.first_name = first_name
      u.last_name  = last_name
      # You might also assign other default attributes here
    end

    # Optionally, generate your own JWT for further requests
    # (Assuming you have a JsonWebToken module set up)
    app_token = JsonWebToken.encode(user_id: user.id)

    render json: { token: app_token, user: user }, status: :ok
  end
end
