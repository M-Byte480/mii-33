class ChatController < ApplicationController
  def recommend
    if params[:data].present?
      begin
        # Parse the incoming JSON data if necessary (assuming it's sent as a string)
        data = params[:data].is_a?(String) ? JSON.parse(params[:data]) : params[:data]
      rescue JSON::ParserError
        return render json: { error: 'Invalid JSON provided' }, status: :unprocessable_entity
      end

      # Get recommendation from ChatService
      response = ChatService.new.recommend_meeting_change(data)
      render json: { recommendation: response }
    else
      render json: { error: 'No data provided' }, status: :unprocessable_entity
    end
  end
  def analysis
    if params[:data].present?
      begin
        # Parse the incoming JSON data if necessary (assuming it's sent as a string)
        data = params[:data].is_a?(String) ? JSON.parse(params[:data]) : params[:data]
      rescue JSON::ParserError
        return render json: { error: 'Invalid JSON provided' }, status: :unprocessable_entity
      end

      # Get analysis from ChatService
      response = ChatService.new.meeting_analytics(data)
      render json: { analysis: response }
    else
      render json: { error: 'No data provided' }, status: :unprocessable_entity
    end
  end
end