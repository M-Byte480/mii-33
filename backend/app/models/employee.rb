class Employee < ApplicationRecord
  belongs_to :user
  has_many :employee_feedbacks, dependent: :destroy

  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true
  validates :hourly_salary, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :position, presence: true
end
