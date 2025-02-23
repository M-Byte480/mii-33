class GetTimesAvailable
  def get_available_times(ids, start_time, end_time, duration)
      available_times_hash = get_events_for_ids(ids, start_time, end_time)
      formatted_calendar = {}
      start_time = DateTime.parse(start_time)
      end_time = DateTime.parse(end_time)
      available_times_hash.each do |id, events|
        total_time = ((end_time - start_time)*24*60).to_i
        list = Array.new(total_time/15, false)
        event_index = 0
        index = 0
        while index < list.size
          duration_to_add = Rational(duration, 1440)
          slot_start_time = start_time + Rational(15 * index, 1440)
          slot_end_time = slot_start_time + duration_to_add
          if event_index < events.size && slot_end_time <= events[event_index].start_time
            list[index] = true
            index += 1
          elsif event_index < events.size && slot_start_time < events[event_index].end_time
            index += (events[event_index].duration / 60) / 15
            event_index += 1
          else
            index += 1
          end
        end
        formatted_calendar[id] = list
      end
      formatted_calendar
  end

  def get_events_for_ids(ids, start_time, end_time)
    available_times_hash = {}
    ids.map do |id|
      @service = PublicCalendarService.new(id)
      results = @service.list_events(start_time, end_time)
      events = []
      results.map { |result| events << Event.new(result[:start_time], result[:end_time]) }

      available_times_hash[id] = events
    end

    available_times_hash
  end

  def calculate_conflicts(available_times_hash, start_time,end_time)
    start_time = DateTime.parse(start_time)
      end_time = DateTime.parse(end_time)
    bookable_times = available_times_hash.values.transpose.map { |times| times.all? }
    bookable_times.map.with_index { |available, index|
      time_slot_start = start_time + Rational(15 * index, 1440)
      [time_slot_start, available]
  }                  .select { |_, available| available }.map { |time, _| time }

  end
end
