class Metric < ApplicationRecord
  validates :total_meeting_hours, numericality: { greater_than_or_equal_to: 0 }
  validates :total_cost, numericality: { greater_than_or_equal_to: 0 }
end
