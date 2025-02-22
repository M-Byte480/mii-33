class ApplicationController < ActionController::API
  before_action :authorize_request

  private

  def authorize_request
    # Expecting the token to be in the Authorization header formatted as "Bearer <token>"
    header = request.headers["Authorization"]
    token = header.split(" ").last if header

    begin
      decoded = JsonWebToken.decode(token)
      @current_user = User.find(decoded[:user_id])
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError => _
      render json: { error: "Not Authorized" }, status: :unauthorized
    end
  end
end
