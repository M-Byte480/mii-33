require "ostruct"

# app/services/calendar_service.rb
class CalendarService
  # This method simulates fetching events for a given user and date.
  def self.mock_events(date)
    day_start = Time.zone.parse("#{date} 09:00")

    # Create some fake events.
    # For example, user has an event from 10:00 to 11:00 and another from 14:00 to 15:30.
    [
      OpenStruct.new(start_time: day_start + 1.hour, end_time: day_start + 2.hour),
      OpenStruct.new(start_time: day_start + 5.hour, end_time: day_start + 6.5.hour)
    ]
  end
end
