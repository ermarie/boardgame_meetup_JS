class PlaysController < ApplicationController

  def show
    play = current_user.games.uniq.select {|game| game.id == params[:game_id].to_i}
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
    render json: play
  end

end
