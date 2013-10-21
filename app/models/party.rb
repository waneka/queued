class Party < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :user_id, :url, :password
  validates_uniqueness_of :password
end