class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
      )
    if @user
      log_in(@user)
      render "api/users/show"

    else
      render json: ["Invalid credentials!"], status: 422
    end
  end

  def show
    @user = current_user
    if current_user
      render "api/users/show"
    else
      render json: {}
    end
  end


  def destroy

      log_out
      render json: {}

    end
end
