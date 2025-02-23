require 'google/apis/calendar_v3'

class PublicCalendarService
  def initialize(calendar_id)
    @calendar_id = calendar_id
    @service = Google::Apis::CalendarV3::CalendarService.new
    @service.key = "AIzaSyBUDWq5HyEvnxy0E-gWZwfC8nXmdFmrTqg"
  end

  def list_events(start_time, end_time, max_results = 10)

    response = @service.list_events(@calendar_id,
                                    max_results: max_results,
                                    single_events: true,
                                    order_by: 'startTime',
                                    time_min: start_time,
                                    time_max: end_time
                                    )
    puts response
    response.items.map do |event|
      {
        start_time: event.start&.date_time || event.start&.date,
        end_time: event.end&.date_time || event.end&.date
      }
    end
  rescue Google::Apis::ClientError => e
    puts "Error fetching calendar: #{e.message}"
    []
  end
end
