Rails.application.config.middleware.use OmniAuth::Builder do
  provider :rdio, ENV['RDIO_CONSUMER_KEY'], ENV['RDIO_CONSUMER_SECRET']
end


