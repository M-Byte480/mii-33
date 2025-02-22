class UsersController < ApplicationController
  def create
    user = User.find_or_create_by(email: user_params[:email]) do |u|
      u.first_name = user_params[:first_name]
      u.last_name  = user_params[:last_name]
    end


    render json: user, status: :ok
  end

  private

  def user_params
    # Expects parameters like { user: { email: "...", first_name: "...", last_name: "..." } }
    params.require(:user).permit(:email, :first_name, :last_name)
  end
end
