require "test_helper"

class MeetingsControllerTest < ActionDispatch::IntegrationTest
  test "should get find_slot" do
    get meetings_find_slot_url
    assert_response :success
  end
end
