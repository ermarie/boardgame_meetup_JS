class UsersController < ApplicationController
  def show
    @user = User.find_by_id(params[:id])
    binding.pry
    @events = @user.events
    @games = @user.games.uniq
  end

end
