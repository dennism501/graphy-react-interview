import styled, { css } from 'styled-components'

import { MARKER_SIZE, MARKER_BORDER_SIZE } from './marker'

const TOOLTIP_SIZE = 150
const SPACE_BETWEEN_TOOLTIP_AND_MARKER = 5

const Tooltip = styled.div`
  background: white;
  box-shadow: 1px 1px 15px -7px rgba(0, 0, 0, 0.29);
  margin-top: -${MARKER_SIZE + MARKER_BORDER_SIZE}px;
  ${'' /*
    Moving the tooltip away from the original marker position
  */}
  margin-left: ${MARKER_SIZE +
    MARKER_BORDER_SIZE +
    SPACE_BETWEEN_TOOLTIP_AND_MARKER}px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 2px;

  ${
    '' /*
    Animating to height and width to make sure the hidden element doesn't show in the flow of the DOM
    This means that the "hover" area for opening the annotation will be only the marker
    Animating opacity to fade in/out
    Using a "delay" on the animation so the user doesn't see the height/width animating, and it appears to be a fade in/out
    We cannot use the display property as it is not animatable
  */
  }
  min-height: 0;
  height: 0;
  min-width: 0;
  opacity: 0;
  transition: min-width 0ms 400ms, height 0ms 400ms, min-height 0ms 400ms,
    opacity 400ms 0ms;

  ${props =>
    props.isOpen
      ? css`
          opacity: 1;
          /* Using min height/width so the user can resize the textarea */
          min-height: ${TOOLTIP_SIZE}px;
          min-width: ${TOOLTIP_SIZE}px;
          height: auto;
          transition: min-width 0ms 0ms, height 0ms 0ms, min-height 0ms 0ms,
            opacity 600ms 0ms;
          z-index: 1;
        `
      : ''}
`

export default Tooltip
