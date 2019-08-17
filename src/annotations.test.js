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

  // WIP in moving this test to here
  // test('creating an annotation at the required location', async () => {
  //   // So that we have an firm/nonchanging input and output (i.e. x = 100, padding = 5, marker size = 25, border = 2)
  //   // We don't want to exactly duplicate the application logic, as it will make the test brittle
  //   // See: https://www.freecodecamp.org/news/the-right-way-to-test-react-components-548a4736ab22/

  //   const { getByTestId } = render(<Annotations />)

  //   fireEvent.click(await getByTestId('container'), {
  //     pageX: 100,
  //     pageY: 100,
  //   })

  //   // We probably wouldn't normally test the style attributes of a component
  //   // But in this case, the positioning of the marker is super important
  //   // We are testing that the annotation gets positioned correctly relative to the initial click
  //   const annotation = await getByTestId('annotation')
  //   expect(annotation).toHaveLength(1)
  //   expect(annotation).toHaveStyle('top: 42px')
  //   expect(annotation).toHaveStyle('left: 92px')
  // })
  // test('showing the tooltip upon hover of a marker', () => {})
  // test('deleting an annotation when the delete button is clicked', () => {})
  // test('editing an annotation', () => {})
  // test('closing the annotation when <x>', () => {})
  // test('opening the annotation when <y>', () => {})
  // test('annotation remaings open when editing', () => {})
})
