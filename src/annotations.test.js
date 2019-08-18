import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Annotations from './annotations'

describe('Annotations', () => {
  test('rendering of annotations without crashing', () => {
    render(<Annotations />)
  })
  test('creating an annotation when the container is clicked', async () => {
    const { queryAllByTestId, getByTestId } = render(<Annotations />)

    expect(await queryAllByTestId('marker')).toHaveLength(0)

    fireEvent.click(await getByTestId('container'), {
      pageX: 100,
      pageY: 100,
    })

    expect(await queryAllByTestId('marker')).toHaveLength(1)
  })

  test('showing the tooltip upon hover of a marker', async () => {
    const { queryAllByTestId, getByTestId } = render(<Annotations />)

    fireEvent.click(await getByTestId('container'), {
      pageX: 100,
      pageY: 100,
    })

    fireEvent.mouseEnter(await getByTestId('marker'))

    expect(await queryAllByTestId('tooltip')).toHaveLength(1)

    fireEvent.mouseLeave(await getByTestId('marker'))

    expect(await queryAllByTestId('tooltip')).toHaveLength(1)
  })

  test('showing the tooltip upon click of a marker', async () => {
    const { queryAllByTestId, getByTestId, queryByTestId } = render(
      <Annotations />
    )

    fireEvent.click(await getByTestId('container'), {
      pageX: 100,
      pageY: 100,
    })

    fireEvent.click(await getByTestId('marker'))

    expect(await queryAllByTestId('tooltip')).toHaveLength(1)
    expect(await queryByTestId('tooltip')).toBeVisible()
  })

  test('deleting an annotation when the delete button is clicked', async () => {
    const { queryAllByTestId, getByTestId } = render(<Annotations />)

    fireEvent.click(await getByTestId('container'), {
      pageX: 100,
      pageY: 100,
    })

    fireEvent.click(await getByTestId('marker'))

    expect(await queryAllByTestId('tooltip')).toHaveLength(1)

    fireEvent.click(await getByTestId('delete-annotation'))

    expect(await queryAllByTestId('marker')).toHaveLength(0)
    expect(await queryAllByTestId('tooltip')).toHaveLength(0)
  })

  test('closing an annotation', async () => {
    const { queryAllByTestId, queryByTestId, getByTestId } = render(
      <Annotations />
    )

    fireEvent.click(await getByTestId('container'), {
      pageX: 100,
      pageY: 100,
    })

    fireEvent.click(await getByTestId('marker'))

    expect(await queryAllByTestId('tooltip')).toHaveLength(1)

    fireEvent.click(await getByTestId('save-annotation'))

    expect(await queryAllByTestId('marker')).toHaveLength(1)
    expect(await queryByTestId('tooltip')).not.toBeVisible()
  })

  test('editing an annotation', async () => {
    const { queryByTestId, getByTestId } = render(<Annotations />)

    fireEvent.click(await getByTestId('container'), {
      pageX: 100,
      pageY: 100,
    })

    // Open the annotation
    fireEvent.click(await getByTestId('marker'))
    fireEvent.click(await getByTestId('annotation-content-container'))

    // Edit the annotation
    userEvent.type(await getByTestId('annotation-editor'), 'foo bar')

    expect(await getByTestId('annotation-editor')).toHaveValue('foo bar')

    // Exit editing and save the annotation (which will close the annotation)
    fireEvent.blur(await getByTestId('annotation-editor'))
    fireEvent.click(await getByTestId('save-annotation'))

    expect(await queryByTestId('tooltip')).not.toBeVisible()

    // Hover over the marker to open the annotation that is not in editing mode
    fireEvent.mouseEnter(await getByTestId('marker'))

    expect(await queryByTestId('tooltip')).toBeVisible()
    expect(await getByTestId('annotation-content')).toHaveTextContent('foo bar')
  })

  test('annotation remaings open when editing', async () => {
    const { queryAllByTestId, getByTestId } = render(<Annotations />)

    fireEvent.click(await getByTestId('container'), {
      pageX: 100,
      pageY: 100,
    })

    // Open the annotation
    fireEvent.click(await getByTestId('marker'))
    fireEvent.click(await getByTestId('annotation-content-container'))

    // Edit the annotation
    userEvent.type(await getByTestId('annotation-editor'), 'foo bar')

    fireEvent.blur(await getByTestId('annotation-editor'))

    // Click elsewhere
    fireEvent.click(await getByTestId('container'), {
      pageX: 5,
      pageY: 5,
    })

    // We expect both tooltips to be open, and we expect to have created a new marker with the second click
    expect(await queryAllByTestId('tooltip')).toHaveLength(2)
    expect(await queryAllByTestId('marker')).toHaveLength(2)
  })
})
