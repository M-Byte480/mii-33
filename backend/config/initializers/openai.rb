require 'openai'
require 'dotenv'
Dotenv.load if defined?(Dotenv)

OpenAI.configure do |config|
  config.access_token =  ENV['OPENAI_API_KEY']
end