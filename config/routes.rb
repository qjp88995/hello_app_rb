Rails.application.routes.draw do
  get 'chat_rooms/show'
  get 'welcome/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :articles do
    resources :comments
  end

  resources :messages

  root 'welcome#index'

end
