# app/controllers/session_controller.rb
class SessionController < ApplicationController
  # Skip authorization for this action since it’s the entry point
  skip_before_action :authorize_request, only: :google_auth

  def google_auth
    # Expect the Google JWT to be sent in the request body as { token: "..." }
    token = params[:token]

    user_info = get_user_info_from_google(token)

    if user_info
      user = User.find_or_create_by(email: user_info["email"]) do |u|
        u.name = user_info["name"]
      end

      jwt = JsonWebToken.encode(user_id: user.id)
      render json: { token: jwt }, status: :ok
    else
      render json: { error: "Invalid token" }, status: :unauthorized
    end
  end

  private

  def get_user_info_from_google(token)
    response = Faraday.get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=#{token}")
    JSON.parse(response.body) if response.success?
  rescue StandardError
    nil
  end
end
