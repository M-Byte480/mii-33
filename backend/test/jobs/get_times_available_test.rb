require 'test_helper'
require 'google/apis/calendar_v3'
require_relative '../../app/jobs/get_times_available'
require_relative '../../app/jobs/google_calendar_api'

class GetTimesAvailableTest < ActiveSupport::TestCase
  setup do
    @service = GetTimesAvailable.new
    @calendar_id = 'genericschoolaccout@gmail.com'
  end

  test 'should get available times' do
    start_time = '2025-02-22T14:45:00Z'
    end_time = '2025-02-22T23:00:00Z'
    ids = [@calendar_id]

    available_times = @service.get_available_times(ids, start_time, end_time, 60)
    
    assert_not_nil available_times
    assert available_times.is_a?(Hash)
    assert available_times[@calendar_id].is_a?(Array)
    Rails.logger.info(available_times)  # Log the available times using Rails.logger
    puts available_times  # Print the available times to the console
  end
end