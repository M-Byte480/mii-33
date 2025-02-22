class MeetingsController < ApplicationController
  def find_slot
    # For now, we're using the mock_events method for both users.
    events_user1 = CalendarService.mock_events(params[:date])
    events_user2 = CalendarService.mock_events(params[:date])

    # Define your working hours (e.g., 09:00 to 17:00)
    day_start = Time.zone.parse("#{params[:date]} 09:00")
    day_end   = Time.zone.parse("#{params[:date]} 17:00")

    free_user1 = free_intervals(events_user1, day_start, day_end)
    free_user2 = free_intervals(events_user2, day_start, day_end)

    intersections = intersect_intervals(free_user1, free_user2)
    @meeting_slot = earliest_meeting_slot(intersections)

    render json: @meeting_slot
  end

  private

  def free_intervals(events, day_start, day_end)
    free_slots = []
    current_time = day_start

    events.sort_by(&:start_time).each do |event|
      event_start = event.start_time
      if current_time < event_start
        free_slots << { start: current_time, end: event_start }
      end
      current_time = [ current_time, event.end_time ].max
    end

    free_slots << { start: current_time, end: day_end } if current_time < day_end
    free_slots
  end

  def intersect_intervals(slots_a, slots_b)
    intersections = []

    slots_a.each do |slot_a|
      slots_b.each do |slot_b|
        start_overlap = [ slot_a[:start], slot_b[:start] ].max
        end_overlap = [ slot_a[:end], slot_b[:end] ].min
        intersections << { start: start_overlap, end: end_overlap } if start_overlap < end_overlap
      end
    end

    intersections
  end

  def earliest_meeting_slot(intersections)
    intersections.min_by { |slot| slot[:start] }
  end
end
