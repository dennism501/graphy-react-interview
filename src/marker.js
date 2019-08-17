import styled from 'styled-components'

export const MARKER_SIZE = 15
export const MARKER_BORDER_SIZE = 2

const Marker = styled.div`
  background: #fff;
  width: ${MARKER_SIZE}px;
  height: ${MARKER_SIZE}px;
  border-radius: ${MARKER_SIZE}px;
  border: ${MARKER_BORDER_SIZE}px solid #000;

  &:hover {
    /* We want the marker to appear above other markers if a user hovers over it */
    cursor: pointer;
    z-index: 1;
  }
`

export default Marker
