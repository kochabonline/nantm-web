import type { Component } from 'vue'

interface button {
  type: string
  title: string
  icon: Component
  onClick: () => void
}

interface Button {
  close: button
  submit: button
}

export type { Button }
