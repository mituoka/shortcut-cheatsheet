export interface Shortcut {
  keys: string[]
  description: string
  category?: string
}

export interface ShortcutApp {
  name: string
  icon: string
  shortcuts: Shortcut[]
}
