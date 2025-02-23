class CreateMetrics < ActiveRecord::Migration[8.0]
  def change
    create_table :metrics do |t|
      t.decimal :total_meeting_hours
      t.decimal :total_cost

      t.timestamps
    end
  end
end
