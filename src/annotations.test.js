import React from 'react'

import Annotations from './annotations'

import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

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
    const { queryAllByTestId, getByTestId } = render(<Annotations />)

    fireEvent.click(await getByTestId('container'), {
      pageX: 100,
      pageY: 100,
    })

    fireEvent.click(await getByTestId('marker'))

    expect(await queryAllByTestId('tooltip')).toHaveLength(1)
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
  // test('editing an annotation', async () => {})
  // test('closing the annotation when <x>', async () => {})
  // test('opening the annotation when <y>', async () => {})
  // test('annotation remaings open when editing', async () => {})
})
