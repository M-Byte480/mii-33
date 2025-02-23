class CreateEmployeeFeedbacks < ActiveRecord::Migration[8.0]
  def change
    create_table :employee_feedbacks do |t|
      t.references :employee, null: false, foreign_key: true
      t.string :necessary
      t.string :email
      t.string :shorter

      t.timestamps
    end
  end
end
