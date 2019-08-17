import styled, { css } from 'styled-components'

import { MARKER_SIZE, MARKER_BORDER_SIZE } from './marker'

const TOOLTIP_SIZE = 150
const SPACE_BETWEEN_TOOLTIP_AND_MARKER = 5

const Tooltip = styled.div`
  background: white;
  box-shadow: 1px 1px 15px -7px rgba(0, 0, 0, 0.29);
  /* Adding some spacing between the marker and the tooltip */
  margin-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 2px;
  /* Using min height/width so the user can resize the textarea */
  min-height: ${TOOLTIP_SIZE}px;
  min-width: ${TOOLTIP_SIZE}px;
  display: none;
  z-index: 1;

  ${props =>
    props.isOpen
      ? css`
          display: flex;
        `
      : ''}
`

export default Tooltip
