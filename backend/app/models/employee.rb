class Employee < ApplicationRecord
  belongs_to :user

  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true
  validates :hourly_salary, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
end
