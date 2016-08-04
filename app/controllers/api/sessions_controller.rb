class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
      )
    if @user
      log_in(@user)
      render json: @user

    else
      render json: ["Invalid credentials!"], status: 422
    end
  end

  def show
    if current_user
      render json: current_user
    else
      render json: {}
    end
  end


  def destroy

      log_out
      render json: {}

    end
end
