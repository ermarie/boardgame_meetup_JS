class UsersController < ApplicationController
  def show
    @user = User.find_by_id(params[:id])
    @events = @user.events
    @games = @user.games.uniq
    respond_to do |format|
      format.html
      format.json { render json: @user }
    end
  end

  def update
    event = Event.find_by_id(cookies[:event_id])
    current_user.events << event
    cookies.delete :event_id
    binding.pry
  end

end
