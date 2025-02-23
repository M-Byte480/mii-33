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

    def meeting_analytics(data)
      json_payload = data.to_json

      prompt = <<~PROMPT
      You are an expert scheduling analyst for a high-performance calendar application. You have been given a **JSON payload** containing:  
      - **Meeting details** (time, duration, topic)  
      - **Participants** (role, availability, preferred time slots, hourly rate)  
      - **Performance metrics** (meeting cost, interruptions, effectiveness score, etc.)  

      ### **Your Task:**  
      Perform a **deep analysis** focusing on two key areas:  

      1. **Cost Analysis:**  
        - Calculate the total cost of the meeting based on participant hourly rates and duration.  
        - Highlight if the cost is unusually high or inefficient.  

      2. **Productivity Impact:**  
        - Analyze how the meeting affects workflow (e.g., interruptions, effectiveness).  
        - Identify scheduling conflicts with participant availability and preferred time slots.  
        - Suggest a better time if the current slot is inefficient.  

      ### **Example Metrics to Include:**  
      - **Total Meeting Cost:** $X (sum of participant costs)  
      - **Flow Time Interruptions:** X disruptions  
      - **Effectiveness Score:** X/1 (e.g., 0.75 = 75%)  
      - **Preferred Time Match:** X% of participants are happy with this time  

      ### **Final Output:**  
      -Provide a **concise recommendation** on whether the meeting should be rescheduled. If so, suggest a new time that **minimizes cost and disruptions** while maximizing effectiveness. Your reasoning should be clear and data-driven—**easy enough for a child to understand.**  
      -Make sure its as short as possible, hitting all the necessary points.
      -Cost, percentage and other valuable info. No pointless stretching of answer.
      -No point in adding how you did things. Just show.

      **JSON Payload:**  
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

# Prompt 2
# {
#   "data": {
#     "meeting_details": {
#       "topic": "Sprint Planning",
#       "current_meeting_time": "10:00",
#       "duration": 60
#     },
#     "participants": [
#       {
#         "id": "P-001",
#         "name": "Alice Johnson",
#         "role": "Manager",
#         "hourly_rate": 100,
#         "free_time": [
#           "09:00",
#           "10:00"
#         ],
#         "preferred_time": [
#           "09:00",
#           "10:00"
#         ]
#       },
#       {
#         "id": "P-002",
#         "name": "Bob Smith",
#         "role": "Developer",
#         "hourly_rate": 80,
#         "free_time": [
#           "10:00",
#           "11:00"
#         ],
#         "preferred_time": [
#           "10:00",
#           "11:00"
#         ]
#       }
#     ],
#     "additional_metrics": {
#       "flow_time_interrupted": 15,
#       "previous_meetings_effectiveness": 75,
#       "calculated_meeting_cost": 90.0
#     }
#   }
# }