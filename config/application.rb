require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    config.autoload_paths += Dir[Rails.root.join('app', 'uploaders')]
    config.generators do |g|
      g.stylesheets false
      g.javascripts false
      g.helper false
      g.test_framework false
    end 
    config.i18n.default_locale = :ja
    config.action_view.automatically_disable_submit_tag = false # この行を追加
    config.time_zone = 'Tokyo'
    config.assets.initialize_on_precompile = false
  end
end
