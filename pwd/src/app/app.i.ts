export type colorState = 'gray' | 'red' | 'yellow' | 'green';

export interface pwdStrength  {
  weak: colorState,
  medium: colorState,
  strong: colorState
}
