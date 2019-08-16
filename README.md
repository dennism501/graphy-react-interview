![Graphy Careers](https://graphy-static.ams3.cdn.digitaloceanspaces.com/careers-alt.png)

# Graphy Annotate

### Local setup

* Clone repository
* Install dependencies: Run `yarn` or `npm install`
* Start local dev server: Run `yarn run dev` or `npm run dev`
* Visit site: Open [http://localhost:8080]()

### Features

Annotation library. Adds ability to place markers.

With a somewhat naive approach, I have tried to address markers that are close to each other with layering:

On hover, I set the z-index of the marker to a higher value than the normal marker, which makes a marker that's underneath
an overlapping marker appear on top of the sibling marker.

### Limitations

* Does not handle browser resizing.

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