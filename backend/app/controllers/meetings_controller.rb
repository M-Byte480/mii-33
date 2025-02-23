require_relative '../jobs/get_times_available.rb'

class MeetingsController < ApplicationController
  def find_slots
    params = JSON.parse(request.body.read)["data"]
    puts params
    timing = GetTimesAvailable.new
    available_times_hash = timing.get_available_times(params["users"], params["start_time"], params["end_time"], params["duration"])
    puts available_times_hash
    render json: timing.calculate_conflicts(available_times_hash, params["start_time"], params["end_time"]), status: :ok
  end


  def create_event
    body = JSON.parse(request.body.read)
    params = body["data"]
    # Ensure the required params are present
    if params["name"].nil? || params["start_time"].nil? || params["end_time"].nil?
      render json: { error: "Missing required event data" }, status: :bad_request
      return
    end

    # Authenticate using the service account
    calendar_service = Google::Apis::CalendarV3::CalendarService.new
    calendar_service.authorization = authenticate_with_service_account

    # Create the event
    event = Google::Apis::CalendarV3::Event.new(
      summary: params["name"],
      location: params["location"],
      start: { date_time: params["start_time"], time_zone: 'UTC' },
      end: { date_time: params["end_time"], time_zone: 'UTC' },
      attendees: params["users"].map { |attendee| { email: attendee } }
    )

    # Create the event in the user's primary calendar
    begin
      created_event = calendar_service.insert_event('genericschoolaccout@gmail.com', event)
      render json: { message: "Event created successfully!", event: created_event }
    rescue Google::Apis::AuthorizationError => e
      render json: { error: "Unauthorized: #{e.message}" }, status: :unauthorized
    rescue StandardError => e
      render json: { error: "Failed to create event: #{e.message}" }, status: :internal_server_error
    end
  end

  private

  def authenticate_with_service_account
    # Path to your service account JSON key file
    service_account_file = Rails.root.join('notsecrets.json')

    # Scopes for Google Calendar API
    scope = 'https://www.googleapis.com/auth/calendar'

    # Authenticate with service account
    credentials = Google::Auth::ServiceAccountCredentials.make_creds(
      json_key_io: File.open(service_account_file),
      scope: scope
    )
    
    credentials
  end
  
  
end
