AllPlayerCardsQuery = class AllPlayerCardsQuery {

  static card_sources() {
    return ['hand', 'discard', 'deck', 'playing', 'in_play', 'revealed', 'duration', 'haven', 'native_village', 'island']
  }

  static find(player_cards) {
    return _.reduce(AllPlayerCardsQuery.card_sources(), function(all_cards, source) {
      return all_cards.concat(player_cards[source])
    }, [])
  }

}
