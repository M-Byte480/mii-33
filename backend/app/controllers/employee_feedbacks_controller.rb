class EmployeeFeedbacksController < ApplicationController
  before_action :set_employee_feedback, only: [ :show, :update, :destroy ]
  before_action :set_employee, only: [ :create ]

  def index
    @employee_feedbacks = EmployeeFeedback.all
    render json: @employee_feedbacks
  end

  def show
    render json: @employee_feedback
  end

  def create
    @employee_feedback = @employee.employee_feedbacks.build(employee_feedback_params)
    if @employee_feedback.save
      render json: @employee_feedback, status: :created
    else
      render json: @employee_feedback.errors, status: :unprocessable_entity
    end
  end

  def update
    if @employee_feedback.update(employee_feedback_params)
      render json: @employee_feedback
    else
      render json: @employee_feedback.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @employee_feedback.destroy
    head :no_content
  end

  private

  def set_employee_feedback
    @employee_feedback = EmployeeFeedback.find(params[:id])
  end

  def set_employee
    @employee = Employee.find(params[:employee_id])
  end

  def employee_feedback_params
    params.require(:employee_feedback).permit(:necessary, :email, :shorter)
  end
end
