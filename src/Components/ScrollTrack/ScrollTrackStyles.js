import responsive from '../../Styles/responsive'
import spacing    from '../../Styles/spacing'

export default {
  containerStyles: {
    overflow: 'hidden',
    position: 'relative',
  },
  innerContainerStyles: {
    whiteSpace: 'nowrap',
    position: 'relative',
    transition: 'left 150ms ease-in-out',

    [responsive.xs]: {
      left: 'inherit',
      overflowX: 'scroll',
      display: 'block',
      msOverflowStyle: 'none',
      overflow: '-moz-scrollbars-none',
      webkitOverflowScrolling: 'touch'
    },
  },
  slideButtonStyles: {
    default: {
      position: 'absolute',
      ...spacing.TOP_XS,
    },
    left: spacing.LEFT_XS,
    right: spacing.RIGHT_XS
  }
}
