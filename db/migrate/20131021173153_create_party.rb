class CreateParty < ActiveRecord::Migration
  def change
    create_table :parties do |t|
      t.integer :user_id
      t.string :url, :password
      t.timestamps
    end
  end
end
