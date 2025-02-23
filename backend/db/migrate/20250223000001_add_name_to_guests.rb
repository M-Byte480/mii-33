class AddNameToGuests < ActiveRecord::Migration[8.0]
  def change
    add_column :guests, :name, :string
  end
end
