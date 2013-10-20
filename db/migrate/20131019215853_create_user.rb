class CreateUser < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :profile_pic_url
      t.string :rdio_uid
      t.timestamps
    end
  end
end
