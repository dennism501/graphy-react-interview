import React from 'react'
import styled from 'styled-components'

import Marker from './marker'
import Tooltip from './tooltip'

// do your magic here 👇
// 😎

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: palegreen;
`

class Annotations extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      annotationStore: [],
      currentId: 0,
    }

    this.handleSelection = this.handleSelection.bind(this)
  }

  handleSelection(ev) {
    const { pageX: x, pageY: y } = ev

    this.setState({
      annotationStore: [
        ...this.state.annotationStore,
        {
          x,
          y,
          isOpen: true,
          id: this.state.currentId++,
          content: 'Some string',
        },
      ],
    })
  }

  render() {
    const { annotationStore } = this.state

    return (
      <Container onClick={this.handleSelection}>
        {annotationStore.map(({ x, y, isOpen, id, content }) => (
          <React.Fragment key={`marker-${id}`}>
            <Marker x={x} y={y} />
            {isOpen && (
              <Tooltip x={x} y={y}>
                {content}
              </Tooltip>
            )}
          </React.Fragment>
        ))}
      </Container>
    )
  }
}

export default Annotations
