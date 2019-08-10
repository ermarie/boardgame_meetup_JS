class GameSerializer < ActiveModel::Serializer

    attributes :id, :name, :min_play_time, :max_play_time, :min_num_players, :max_num_players, :min_age, :max_age

end