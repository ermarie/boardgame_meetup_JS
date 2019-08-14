class PlaysController < ApplicationController

  def show
    play = current_user.plays.find_by(game_id: params[:game_id])
    render json: play
  end

  def update
    binding.pry
    play = Play.find(params[:id])
    @game = Game.find(params[:game_id])
    num = play.num_plays
    num = num + 1
    play.update(num_plays: num)
    play.save
    redirect_to game_path(@game)
  end

end
