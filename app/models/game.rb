class Game < ApplicationRecord
    has_many :plays
    has_many :users, through: :plays

    validates :name, presence: true, uniqueness: true

    scope :kid_friendly, -> {where("min_age < ?", "10")}

end
