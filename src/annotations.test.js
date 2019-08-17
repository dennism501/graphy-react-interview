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
  // test('showing the tooltip upon hover of a marker', () => {})
  // test('deleting an annotation when the delete button is clicked', () => {})
  // test('editing an annotation', () => {})
  // test('closing the annotation when <x>', () => {})
  // test('opening the annotation when <y>', () => {})
  // test('annotation remaings open when editing', () => {})
})
