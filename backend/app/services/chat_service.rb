class ChatService
    def initialize
      @client = OpenAI::Client.new
    end
  
    def ask_question(question)
      response = @client.chat(
        parameters: {
          model: 'gpt-4o', # You can use 'gpt-3.5-turbo' for GPT-3.5
          messages: [{ role: 'user', content: question }],
          temperature: 0.7
        }
      )
      response.dig('choices', 0, 'message', 'content').strip
    rescue StandardError => e
      Rails.logger.error("OpenAI API error: #{e.class} - #{e.message}\n#{e.backtrace.join("\n")}")
      'Sorry, I am having trouble responding at the moment. Please try again later.'
    end

    def recommend_meeting_change(data)
      json_payload = data.to_json


      prompt = <<~PROMPT
      You are a scheduling assistant for a calendar application.
      Analyze the following JSON payload which contains:
      - Meeting details (time, duration)
      - Participant details (role, free time, preferred time range, hourly rate)
      
      Based on the data, please provide a clear recommendation for leadership on whether to:
      - Push the meeting forward (earlier), or
      - Push the meeting back (later)
      - Consider cost efficiency by factoring in hourly rates.
      - If rescheduling is needed, recommend an optimal time that minimizes conflicts and respects preferences.
      - It doesn't have to be exact but rather a recommendation

      Provide a clear recommendation: 
      - Keep the meeting at the current time, or 
      - Push the meeting forward (earlier), or 
      - Push the meeting back (later). 

      Wanted output:
      -So make this as short and as readable for a human as possible.
      -Should be around 2 sentances
      -Give a clear instruction Push meeting forware/back.
      -Make it so a child can read it.
      
      JSON Payload:
      #{json_payload}
    PROMPT

    ask_question(prompt)
    end
  end

# For prompt 1
#   {
#   "meeting_details": {
#     "current_meeting_time": "10:00",
#     "duration": 60
#   },
#   "participants": [
#     {
#       "role": "Manager",
#       "free_time": ["09:00", "10:00"],
#       "preferred_time_range": "09:30 - 12:00",
#       "hourly_rate": 100
#     },
#     {
#       "role": "Developer",
#       "free_time": ["10:00", "11:00"],
#       "preferred_time_range": "10:30 - 13:00",
#       "hourly_rate": 80
#     }
#   ]
# }