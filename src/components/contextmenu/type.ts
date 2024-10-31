interface Props {
  visible: boolean
  style: {
    left: string
    top: string
  }
  items: {
    key: string
    text: string
    onClick: () => void
  }[]
}

export type { Props }
