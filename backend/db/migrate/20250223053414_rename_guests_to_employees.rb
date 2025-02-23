class RenameGuestsToEmployees < ActiveRecord::Migration[8.0]
  def change
    rename_table :guests, :employees
  end
end
