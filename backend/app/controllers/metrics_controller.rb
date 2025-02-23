class MetricsController < ApplicationController
  before_action :set_metric, only: [ :show, :update, :destroy ]

  def index
    @metrics = Metric.all
    render json: @metrics
  end

  def show
    render json: @metric
  end

  def create
    @metric = Metric.new(metric_params)
    if @metric.save
      render json: @metric, status: :created
    else
      render json: @metric.errors, status: :unprocessable_entity
    end
  end

  def update
    if @metric.update(metric_params)
      render json: @metric
    else
      render json: @metric.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @metric.destroy
    head :no_content
  end

  def get_metrics
    @metrics = Metric.all
    render json: @metrics
  end

  private

  def set_metric
    @metric = Metric.find(params[:id])
  end

  def metric_params
    params.require(:metric).permit(:total_meeting_hours, :total_cost)
  end
end
