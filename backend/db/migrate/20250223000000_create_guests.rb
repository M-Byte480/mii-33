class CreateGuests < ActiveRecord::Migration[8.0]
  def change
    create_table :guests do |t|
      t.string :email, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
