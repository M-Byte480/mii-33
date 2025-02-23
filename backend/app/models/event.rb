class Event
  attr_reader :start_time, :end_time, :duration


  def initialize(start_time, end_time)
    @start_time = start_time
    @end_time = end_time
    @duration = (end_time - start_time).to_i if start_time && end_time
  end
end