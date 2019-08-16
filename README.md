![Graphy Careers](https://graphy-static.ams3.cdn.digitaloceanspaces.com/careers-alt.png)

# Graphy Annotate

Place Annotations anywhere!

[See online here](https://graphy-react-interview.scottwarren.dev/)

### Local setup

* Clone repository
* Install dependencies: Run `yarn` or `npm install`
* Start local dev server: Run `yarn run dev` or `npm run dev`
* Visit site: Open [http://localhost:8080]()

### Testing

Run using `yarn run test` or `npm run test`

### Features

Supports ability to place annotations anywhere on the page.
Supports ability to delete a previously placed annotation
Supports ability to edit a previously placed annotation
Shows/hides annotation on hover (intuitively doesn't hide when a user is editing the contents of the annotation)

With a somewhat naive approach, I have tried to address markers that are close to each other with layering:

On hover, I set the z-index of the marker to a higher value than the normal marker, which makes a marker that's underneath
an overlapping marker appear on top of the sibling marker.

### Limitations

* Does not handle browser resizing.
* Would like to make this more re-usable, where you would add the annotations component as a child of a block element that
  you want to be able to add annotations to, and it would work. You'd be able to only add annotations within the bounds
  of that element, and it would be self contain all of the annotations.

### Data Structure

I am storing an object of the annotation objects, which contains the x/y of the original click, which is where I add the marker
Using an object of annotations instead of array for ease of access, since the order of markers don't matter.

Data structure for an Annotation:

```
type Annotation {
  // X position of the marker
  x: int,
  // Y position of the marker
  y: int,
  // Whether or not the Annotation is open (this is flipped each time the marker is clicked)
  isOpen: Boolean,
  // ID: used to find the annotation when deleting/editing
  id: int,
  // Content of the Annotation. For now this is a simple string, but ideally would be rich text (i.e. Markdown)
  content: string,
  // Is the user editing the annotation note
  isEditing: Boolean,
}
```

### Persistence

The annotations do not persist between page loads. The assumption being is that in the real world, there would be an API to save the annotations for retrieval later

### Points to Address

- brief description of the solution
- reasoning behind your technical choices
- trade-offs you might have made or anything you left out
- describe what you did differently (if anything)
- what you might have done differently if you were to spend additional time on this solution