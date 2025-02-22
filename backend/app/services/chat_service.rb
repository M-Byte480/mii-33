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
      Rails.logger.error("OpenAI API error: #{e.message}")
      'Sorry, I am having trouble responding at the moment.'
    end
  end