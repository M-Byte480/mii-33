class MeetingsController < ApplicationController
  def find_slot
    final_availability = []
    params["users"].each do |user|
      # TODO
      user_avail = []
      user_avail.each_with_index do |busy, i|
        if busy
          final_availability[i] = busy
        end
      end
    end

    render json: params
  end

  private
end
