import React from 'react'
import styled, { css } from 'styled-components'
import { uniqueId } from 'lodash'

import Marker from './marker'
import Annotation from './annotation'

import Tooltip from './tooltip'

const ID_PREFIX = 'annotation_'

// TODO: implement Tooltip out of bounds check:
// if body.width < (tooltipwidth + padding + tooltip.x)
// if body.height < (tooltipheight + padding + tooltip.y)

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: palegreen;
`

const DeleteButton = styled.button`
  cursor: pointer;
  border: 0;
  background: red;
  color: #fff;
  font-weight: bold;
  margin-top: 5px;
`

const AnnotationEditor = styled.textarea`
  width: 100%;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  border-radius: 3px;
  border: 1px solid #222;
`

const AnnotationContent = styled.div`
  flex-grow: 1;
  ${props =>
    !props.content &&
    css`
      font-size: 0.75em;
      color: grey;
    `}
`

// Add tests for:
// Container click click (a marker should be created)
// hover over created marker (should show tooltip)
// Delete annotation

const createNewAnnotation = ({ x, y, id }) => ({
  x,
  y,
  isOpen: true,
  id,
  content: '',
  isEditing: true,
})

class Annotations extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      annotationStore: {},
      isCurrentlyEditing: false,
    }
  }

  handleSelection = ev => {
    const { pageX: x, pageY: y } = ev

    const id = uniqueId(ID_PREFIX)

    // We don't want to create a new annotation if we're editing one at the moment, and we 'finish' editing by clicking out side of the annotation
    // We are also "done" editing so we don't get stuck in a loop of not being able to edit
    if (this.state.isCurrentlyEditing) {
      return this.setState({
        isCurrentlyEditing: false,
      })
    }

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: createNewAnnotation({ x, y, id }),
      },
      isCurrentlyEditing: true,
    })
  }

  handleAnnotationHoverEnter = id => () => {
    const annotation = { ...this.state.annotationStore[id] }

    // No need to update the state if the annotation's tooltip tooltip is already open
    if (annotation.isOpen === true) return

    annotation.isOpen = true

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: annotation,
      },
    })
  }

  handleAnnotationHoverExit = id => () => {
    const annotation = {
      ...this.state.annotationStore[id],
    }

    // If the user is editing the annotation, don't close it on them. It'll make people grumpy! 😡
    if (annotation.isEditing && this.state.isCurrentlyEditing) return

    // No need to update the state if the annotation's tooltip is already closed
    if (annotation.isOpen === false) return

    annotation.isOpen = false

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: annotation,
      },
    })
  }

  handleDeleteAnnotation = id => ev => {
    ev.stopPropagation()
    const annotationStore = { ...this.state.annotationStore }

    // Delete the annotation by ID
    delete annotationStore[id]

    this.setState({
      annotationStore,
      isCurrentlyEditing: false,
    })
  }

  handleEditBlur = id => ev => {
    const newContent = ev.target.value

    const annotation = {
      ...this.state.annotationStore[id],
    }

    annotation.content = newContent
    annotation.isEditing = false
    annotation.isOpen = false

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: annotation,
      },
    })
  }

  handleEditClick = id => ev => {
    ev.stopPropagation()

    const annotation = {
      ...this.state.annotationStore[id],
    }

    // No need to update the state if the user is already editing this annotation
    if (annotation.isEditing) return

    annotation.isEditing = true

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: annotation,
      },
      isCurrentlyEditing: true,
    })
  }

  render() {
    const { annotationStore } = this.state

    return (
      <Container onClick={this.handleSelection}>
        {Object.values(annotationStore).map(
          ({ x, y, isOpen, id, content, isEditing }) => (
            <Annotation
              key={`marker-${id}`}
              x={x}
              y={y}
              annotationId={id}
              // We are currying for these event handlers, so if performance starts to become an issue
              // We should look into memoising the event handlers
              // https://medium.com/@Charles_Stover/cache-your-react-event-listeners-to-improve-performance-14f635a62e15
              onMouseEnter={this.handleAnnotationHoverEnter(id)}
              onMouseLeave={this.handleAnnotationHoverExit(id)}
            >
              <Marker x={x} y={y} isOpen={isOpen} />
              {isOpen && (
                <Tooltip x={x} y={y} onClick={this.handleEditClick(id)}>
                  {isEditing && (
                    <AnnotationEditor
                      autoFocus
                      defaultValue={content}
                      placeholder='Enter annotation here...'
                      onClick={this.handleEditClick(id)}
                      onBlur={this.handleEditBlur(id)}
                    />
                  )}
                  {!isEditing && (
                    <AnnotationContent content={content}>
                      {content ? content : 'Click to edit'}
                    </AnnotationContent>
                  )}
                  <DeleteButton
                    type='button'
                    onClick={this.handleDeleteAnnotation(id)}
                  >
                    delete
                  </DeleteButton>
                </Tooltip>
              )}
            </Annotation>
          )
        )}
      </Container>
    )
  }
}

export default Annotations
