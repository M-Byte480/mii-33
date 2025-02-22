class ChatController < ApplicationController
    def ask
      if params[:question].present?
        payload = "You are a scheduling assistant. You will be provided with a JSON payload that contains details for each meeting participant including their role, free time, and preferred time. The payload also contains the current meeting time and the total number of participants. Analyze the data and recommend whether to push the meeting forward (earlier) or push it back (later). Provide a clear recommendation with a brief explanation. Here is the payload: { \'participants\': [{\'role\': \'Manager\', \'free_time\': [\'09:00\', \'10:00\'], \'preferred_time\': \'09:30\'},{\'role\': \'Developer\', \'free_time\': [\'10:00\', \'11:00\'], \'preferred_time\': \'10:30\'}],\'current_meeting_time\': \'10:00\',\'participant_count\': 2}"
        response = ChatService.new.ask_question(params[:question])
        render json: { answer: response }
      else
        render json: { error: 'No question provided' }, status: :unprocessable_entity
      end
    end
  end