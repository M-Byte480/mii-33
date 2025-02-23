class AddHourlySalaryToGuests < ActiveRecord::Migration[8.0]
  def change
    add_column :guests, :hourly_salary, :decimal, precision: 10, scale: 2
  end
end
