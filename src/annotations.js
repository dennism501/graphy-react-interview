import React from 'react'
import styled from 'styled-components'
import { findIndex, get, find, uniqueId } from 'lodash'

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
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
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

  handleMarkerClick(ev, id) {
    // Make sure we don't trigger any other events (i.e.)
    ev.stopPropagation()

    // We need to index so that we can
    const annotationIndex = findIndex(
      this.state.annotationStore,
      annotation => annotation.id === id
    )

    const annotation = this.state.annotationStore[annotationIndex]

    debugger

    // if (annotationIndex === -1)

    // const annotation = get(this.state.annotationStore, annotationIndex)

    // There isn't a corresponding annotation, so we cannot continue
    if (!annotation) return

    // If the annotation is open, close it, and vice-versa
    if (annotation.isOpen) {
      annotation.isOpen = false
    } else {
      annotation.isOpen = true
    }

    this.setState({
      anno,
    })
  }

  render() {
    const { annotationStore } = this.state

    return (
      <Container onClick={this.handleSelection}>
        {annotationStore.map(({ x, y, isOpen, id, content }) => (
          <React.Fragment key={`marker-${id}`}>
            <Marker
              x={x}
              y={y}
              onClick={ev => this.handleMarkerClick(ev, id)}
            />
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
