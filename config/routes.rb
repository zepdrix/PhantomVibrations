Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    resources :users, :tracks, :comments
    resource :session
  end

  root 'static_pages#root'

  # get '/*path', to: 'static_pages#root'

end
