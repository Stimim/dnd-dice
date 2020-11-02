import { Attack, AttackModifier } from './attack';


export interface Profile {
  id: string;
  attacks: Attack[];
  attackModifiers: AttackModifier[];
}
