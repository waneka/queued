class User < ActiveRecord::Base
  has_many :parties

  def self.find_or_create_from_auth_hash(auth_hash)
    user = self.find_or_create_by(rdio_uid: auth_hash["uid"])
    if user
      first_name = auth_hash["info"]["first_name"]
      last_name = auth_hash["info"]["last_name"]
      profile_pic_url = auth_hash["info"]["image"]
      user.update_attributes(first_name: first_name, last_name: last_name, profile_pic_url: profile_pic_url)
    end
    user
  end
end
