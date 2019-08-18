![Graphy Careers](https://graphy-static.ams3.cdn.digitaloceanspaces.com/careers-alt.png)

# annotips.js ⤴️

Place Annotations anywhere!

Original brief here 👉 [Original Brief](README.original.md)

[See online here](https://graphy-react-interview.scottwarren.dev/)

### Features

* Supports ability to place annotations anywhere on the page.
* Upon creation of an annotation, a marker is placed where the user clicked to indicate the position of the annotation
* Supports ability to delete a previously placed annotation
* Supports ability to edit a previously placed annotation
* Shows/hides annotation on hover (doesn't hide when a user is editing the contents of the annotation)
* Mobile friendly (tested on iOS Safari on an iPhone 7 plus) (although the markers aren't big enough to be touch friendly)

Markers in close proximity work:

With a somewhat naive approach, I have tried to address usage of markers that are close to each other with layering.

On hover, I set the z-index of the marker to a higher value than the normal marker, which makes a marker that's underneath
an overlapping marker appear on top of the sibling marker.

### Limitations

* Does not handle browser resizing.
* Would like to make this more re-usable, where you would add the annotations component as a child of a block element that
  you want to be able to add annotations to, and it would work. You'd be able to only add annotations within the bounds
  of that element, and it would self contain all of the annotations.
* Does no collision testing currently (i.e. if an annotation is outside of the contents of the body, we should display it in a different way)
* Does not handle long unbroken text very well (essentially just hides it)

### The Future/If I had more time

If given more time, or this was something I was developing for work, I would use an external library where possible (Annotations, Tooltips, etc). If using a library remains off the table, I would likely investigate solutions on the market to see what things I can learn from (including but not limited to the API usage, the style choices, the overall UX of the annotations, etc).

* I would love to get this in front of a user so confirm the UX of editing/deleting/usage.
* Handle implementations on graphs and more "real world" use cases.
* Componentise the annotations component in a more re-usable way.
* Improve how long pieces of text get handled inside the annotations
* Would add rich text editing (ability to write in Markdown)
* Expansion of the Annotations API:
  * Ability to choose from a predesigned subset of Markers
  * Ability to supply a custom Marker
  * Custom callbacks for different events
* The annotations do not persist between page loads. Would like to add persistence to localstorage (so that if the API request to save the annotations fails, the user doesn't lose their annotations)
* Handle collision of bounding box (i.e. the browser viewport)

### Local setup

* Clone repository
* Install dependencies: Run `yarn` or `npm install`
* Start local dev server: Run `yarn run dev` or `npm run dev`
* Visit site: Open [http://localhost:8080]()

### Testing

Run using `yarn run test` or `npm run test`.

Tests are written using Jest and React Testing Library.

### Linting

Run normal linting using `yarn run lint` or `npm run lint`

Run the ESLint automatic fix using `yarn run lint:fix` or `npm run lint:fix`

### Hooks

Tests and linting are both run on the pre-commit hook. Pass `--no-verify` to `git commit` if you want to skip these.

### Deployment

Deployed to [https://graphy-react-interview.scottwarren.dev/]() via Netlify.

To deploy:

* Run a build: `yarn run build` or `npm run build`
* Deploy:
  * To a pre-production/preview/staging environment: `npx ntl deploy`
  * To production: `npx ntl deploy --prod`

OR, just run:

Preview: `yarn run deploy`
Production: `yarn run deploy:prod`

### Data Structure

I am storing an object of the annotation objects (where the key is a unique ID), which contains the x/y of the original click, which is where I add the marker.

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
