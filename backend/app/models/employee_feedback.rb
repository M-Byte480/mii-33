class EmployeeFeedback < ApplicationRecord
  belongs_to :employee

  validates :necessary, presence: true
  validates :email, presence: true
  validates :shorter, presence: true
end
