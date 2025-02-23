require_relative '../jobs/calculate_available_times.rb'
require_relative '../jobs/get_times_available.rb'

class MeetingsController < ApplicationController
  def find_slots
    params = JSON.parse(request.body.data)
    timing = GetTimesAvailable.new
    available_times_hash = timing.get_available_times(params["users"], params["start_time"], params["end_time"], params["duration"])
    render json: timing.calculate_conflicts(params["users"], params["start_time"], params["end_time"], params["duration"], available_times_hash), status: :ok
  end
  
  
end
