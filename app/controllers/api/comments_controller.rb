class Api::CommentsController < ApplicationController

  def create
    @comment = current_user.comments.new(comment_params)

    if @comment.save
      render "api/comments/show"
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy

  end

  def index
    @comments = Comment.includes(:track, :user).all.sort { |x,y| x.created_at - y.created_at }
    render "api/comments/index"
  end

  def show
    @comment = Comment.includes(:track, :user).find(params[:id]).sort { |x,y| x.track_percentage - y.track_percentage }
  end

  private

  def comment_params
    params.require(:comment).permit(:track_id, :body, :track_percentage)
  end

end
