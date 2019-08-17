import styled from 'styled-components'

const TOOLTIP_SIZE = 150

const Tooltip = styled.div`
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  /* Adding some spacing between the marker and the tooltip */
  margin-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-direction: column;
  padding: 10px;
  border-radius: 2px;
  /* Using min height/width so the user can resize the textarea */
  min-height: ${TOOLTIP_SIZE}px;
  min-width: ${TOOLTIP_SIZE}px;
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  z-index: 1;
`

export default Tooltip
