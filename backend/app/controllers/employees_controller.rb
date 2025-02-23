class EmployeesController < ApplicationController
  before_action :set_guest, only: [ :show, :update, :destroy ]

  def index
    @employees = current_user.employees
    render json: @employees
  end

  def show
    render json: @guest
  end

  def create
    @guest = current_user.employees.build(guest_params)
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
    @guest = current_user.employees.find(params[:id])
  end

  def guest_params
    params.require(:guest).permit(:email, :name, :hourly_salary)
  end
end
