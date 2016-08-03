class StaticPagesController < ApplicationController
  def root
    @user = current_user
    if @user
      gon.jbuilder "app/views/api/users/show.json.jbuilder", as: :user
    end
  end
end
