class AddSummaryToEvents < ActiveRecord::Migration[8.0]
  def change
    add_column :events, :summary, :string
  end
end
