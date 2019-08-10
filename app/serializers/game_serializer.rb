class PGameSerializer
    def self.serialize(game)
   
        serialized_game = '{'

        serialized_game += '"id": ' + game.id.to_s + ', '
        serialized_game += '"name": "' + game.title + '", '
        serialized_game += '"min_play_time": "' + game.min_play_time + '", '
        serialized_game += '"max_play_time": "' + game.max_play_time + '", '
        serialized_game += '"min_num_players": "' + game.min_num_players + '", '
        serialized_game += '"max_num_players": "' + game.max_num_players + '", '
        serialized_game += '"min_age": "' + game.min_age + '", '
        serialized_game += '"max_age": "' + game.max_age + '"'

        serialized_game += '}'
    end
  end