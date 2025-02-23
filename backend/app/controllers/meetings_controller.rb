require_relative '../jobs/get_times_available.rb'

class MeetingsController < ApplicationController
  def find_slots
    params = JSON.parse(request.body.read)["data"]
    puts params
    timing = GetTimesAvailable.new
    available_times_hash = timing.get_available_times(params["users"], params["start_time"], params["end_time"], params["duration"])
    render json: timing.calculate_conflicts(available_times_hash, params["start_time"], params["end_time"]), status: :ok
  end
  
  
end
