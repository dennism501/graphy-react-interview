import styled from 'styled-components'

export const TOOLTIP_WIDTH = 200
export const TOOLTIP_HEIGHT = 150

export const TooltipTitle = styled.strong`
  margin-bottom: 5px;
`

const Tooltip = styled.div`
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  /* Adding some spacing between the marker and the tooltip */
  margin-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-direction: column;
  padding: 10px;
  border-radius: 3px;
  /* Using min height/width so the user can resize the textarea */
  min-height: ${TOOLTIP_HEIGHT}px;
  min-width: ${TOOLTIP_WIDTH}px;
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  z-index: 1;
`

export default Tooltip
