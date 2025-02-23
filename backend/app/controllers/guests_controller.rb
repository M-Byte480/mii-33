class GuestsController < ApplicationController
  before_action :set_guest, only: [ :show, :update, :destroy ]

  def index
    @guests = current_user.guests
    render json: @guests
  end

  def show
    render json: @guest
  end

  def create
    @guest = current_user.guests.build(guest_params)
    if @guest.save
      render json: @guest, status: :created
    else
      render json: @guest.errors, status: :unprocessable_entity
    end
  end

  def update
    if @guest.update(guest_params)
      render json: @guest
    else
      render json: @guest.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @guest.destroy
    head :no_content
  end

  private

  def set_guest
    @guest = current_user.guests.find(params[:id])
  end

  def guest_params
    params.require(:guest).permit(:email, :name)
  end
end
