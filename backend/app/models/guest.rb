class Guest < ApplicationRecord
  belongs_to :user

  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true
end
