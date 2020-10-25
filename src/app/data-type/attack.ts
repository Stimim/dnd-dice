export interface Attack {
  name: string;
  // attack bonus.
  // Multiple hit can be defined by (e.g.) 17/17/12. Then there will be three
  // attack rolls, with attack bonus 17, 17, 12 respectively.
  attack: string;
  // damage roll.
  // Example: 1d8 + 1 + 2 + 3
  damage: string;
  // It will be a critical hit if `d20 >= critical_threshold`.
  crit_threshold: number;
  // Multiplier to be applied on critical hit.
  // crit_damage = roll(damage) + roll(damage) + ...
  crit_multiplier: number;
}
