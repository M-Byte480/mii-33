class AuthTestController < ApplicationController
  def test
    render json: { message: "Authentication successful" }, status: :ok
  end
end
