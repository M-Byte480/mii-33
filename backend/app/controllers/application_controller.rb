class ApplicationController < ActionController::API
  before_action :authorize_request

  attr_reader :current_user

  private

  def authorize_request
    header = request.headers["Authorization"]
    token = header.split(" ").last if header

    begin
      decoded = JsonWebToken.decode(token)
      if decoded
        @current_user = User.find(decoded[:user_id])
      else
        render json: { error: "Not Authorized" }, status: :unauthorized
      end
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError => _
      render json: { error: "Not Authorized" }, status: :unauthorized
    end
  end
end
