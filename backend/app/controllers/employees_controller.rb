class EmployeesController < ApplicationController
  before_action :set_employee, only: [ :show, :update, :destroy ]

  def index
    @employees = current_user.employees
    render json: @employees
  end

  def show
    render json: @employee
  end

  def create
    @employee = current_user.employees.build(employee_params)
    if @employee.save
      render json: @employee, status: :created
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  def update
    if @employee.update(employee_params)
      render json: @employee
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @employee.destroy
    head :no_content
  end

  private

  def set_employee
    @employee = current_user.employees.find(params[:id])
  end

  def employee_params
    params.require(:employee).permit(:email, :name, :hourly_salary)
  end
end
