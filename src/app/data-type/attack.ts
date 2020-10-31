export interface Attack {
  id: number;
  name?: string;
  // attack bonus.
  // Multiple hit can be defined by (e.g.) 17/17/12. Then there will be three
  // attack rolls, with attack bonus 17, 17, 12 respectively.
  attack?: string;
  // damage roll.
  // Example: 1d8 + 1 + 2 + 3
  damage?: string;
  // It will be a critical hit if `d20 >= critical_threshold`.
  crit_threshold?: string;
  // Multiplier to be applied on critical hit.
  // crit_damage = roll(damage) + roll(damage) + ...
  crit_multiplier?: string;
}

export interface AttackModifier {
  name?: string;
  attack_bonus?: string;
  damage_bonus?: string;
  // This "overrides" the damage bonus on critical hit ("not" adding to it).
  // If this is empty, the default value is:
  //    dice_of(damage_bonus) + crit_multiplier * const_of(damage_bonus)
  damage_bonus_on_crit?: string;
}
