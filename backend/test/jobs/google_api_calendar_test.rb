require 'test_helper'
require 'google/apis/calendar_v3'
require 'googleauth'
require 'googleauth/stores/file_token_store'
require 'ostruct' 
require_relative '../../app/jobs/google_calendar_api'

class PublicCalendarServiceTest < ActiveSupport::TestCase
  setup do
    @calendar_id =  'genericschoolaccout@gmail.com'
    @service = PublicCalendarService.new(@calendar_id)
  end

  test 'should list events' do
    events = @service.list_events
    assert_not_nil events
    Rails.logger.info(events)  # Log the events using Rails.logger
    puts events 
    assert events.is_a?(Array)
  end

end