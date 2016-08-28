class Api::LikesController < ApplicationController

  def create
    @like = Like.new(
      user_id: current_user.id,
      track_id: like_params[:track_id]
      )

      if @like.save
        render "api/likes/show"
      else
        render json: @like.errors.full_messages, status: 422
      end
  end

  def destroy
    @like = Like.find_by(
      user_id: current_user.id,
      track_id: like_params[:track_id]
      )

    if @like.destroy
      render "api/likes/show"
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  private
  def like_params
    params.require(:like).permit(:track_id)
  end


end
