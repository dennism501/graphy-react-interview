import styled, { css } from 'styled-components'

import { MARKER_SIZE } from './marker'

const TOOLTIP_SIZE = 150

const Tooltip = styled.div`
  position: relative;
  background: white;
  box-shadow: 1px 1px 15px -7px rgba(0, 0, 0, 0.29);
  border-radius: 2px;
  padding: 5px;
  width: ${TOOLTIP_SIZE}px;
  min-width: ${TOOLTIP_SIZE}px;
  max-width: ${TOOLTIP_SIZE * 2}px;
  min-height: ${TOOLTIP_SIZE}px;
  max-height: ${TOOLTIP_SIZE * 2}px;
  margin-left: 5px;
  top: -${MARKER_SIZE}px;
  left: ${MARKER_SIZE}px;
  cursor: text;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;

  opacity: 0;
  transition: opacity 0.5s ease-in-out;

  ${props =>
    props.isOpen
      ? css`
          opacity: 1;
        `
      : ''}
`

export default Tooltip
