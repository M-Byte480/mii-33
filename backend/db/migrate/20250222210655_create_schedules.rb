class CreateSchedules < ActiveRecord::Migration[8.0]
  def change
    create_table :schedules do |t|
      t.references :event, null: false, foreign_key: true

      t.timestamps
    end
  end
end
