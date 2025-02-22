class Event < ApplicationRecord
  before_save :calculate_duration


  def calculate_duration
    self.duration = (end_time - start_time).to_i if start_time && end_time
  end
end