class CreateTableParties < ActiveRecord::Migration
  def change
    create_table :table_parties do |t|
      t.integer :user_id
      t.string :url, :password
      t.timestamps
    end
  end
end
