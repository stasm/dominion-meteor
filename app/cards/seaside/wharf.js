Wharf = class Wharf extends Card {

  types() {
    return ['action', 'duration']
  }

  coin_cost() {
    return 5
  }

  play(game, player_cards) {
    player_cards.duration_effects.push(this.to_h())

    let card_drawer = new CardDrawer(game, player_cards)
    card_drawer.draw(2)

    game.turn.buys += 1
    game.log.push(`&nbsp;&nbsp;<strong>${player_cards.username}</strong> gets +1 buy`)
    return 'duration'
  }

  duration(game, player_cards, duration_card) {
    let card_drawer = new CardDrawer(game, player_cards)
    let drawn_count = card_drawer.draw(2, false)
    game.turn.buys += 1
    game.log.push(`&nbsp;&nbsp;<strong>${player_cards.username}</strong> draws ${drawn_count} card(s) and gets +1 buy from ${CardView.render(duration_card)}`)
  }

}
