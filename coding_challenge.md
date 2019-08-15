![Graphy Careers](https://graphy-static.ams3.cdn.digitaloceanspaces.com/careers-alt.png)

# Graphy React Coding Challenge

Hey! 👋

Thanks for your interest in joining the Graphy team. This open-ended coding challenge is part of our evaluation process. We think (and hope you agree) that this approach is way better than asking you to solve interview puzzles or to scribble algorithms on a whiteboard.

We know this will be a significant investment of effort from your side, but one we hope will be worthwhile for both you and us. Even if your application to Graphy is ultimately unsuccessful, feel free to include what you produce for this challenge in your personal portfolio.

## Challenge

Write a small React app that allows users to add annotations.

## Prerequisites

1. Make sure you have these installed on your machine:
    1. [Node](https://nodejs.org/en/)
    2. [Yarn](https://yarnpkg.com/en/docs/install) (optional)
2. Follow the setup instructions below.

## Setup

1. Clone this repo to your local machine.
2. The repo includes a super basic React starter app.
3. Run `yarn` (or `npm install`).
4. Run `yarn dev` (or `npm run dev`) to start the dev server.

## Guidelines

1. Make it possible to add annotations anywhere on the screen.
2. When an annotation is added, a marker is generated and shown on the screen.
3. Markers should be interactive. When you hover over a marker, the annotation should show up as a tooltip. Implement your own version of tooltips (don't use "title" for that).
4. **BONUS:** Annotations should be editable and deletable.
5. **BONUS:** Figure out a way to efficiently interact with markers that overlap. For instance, in data visualization you can have charts with lots of data points. To interact with large amounts of data points (or lines), an invisible Voronoi diagram is generated which makes the interaction easy and intuitive ([see example](https://bl.ocks.org/mbostock/8033015)). How would you solve this for annotations?

## Sketch

There are some things mentioned in this readme, and this illustration explains these.

![Illustration](https://i.imgur.com/1k84vVF.png)

## Requirements

1. It's up to you how the tooltips should look like. But we like shiny things, so you'll get more points if you nail the UI.
2. You'll also get points if your solution handles more use cases than described and include things that would make sense in a real-world scenario.
3. You should not use any third-party library that implements annotations or tooltips (eg react-annotation for annotations, react-tippy for tooltips etc).
4. We value attention to small details. Be creative! 🎨

## Review

How we review (todo)

## Submission

1. If you use GitHub, upload your solution to GitHub and make the repo private. Add [@romans](https://github.com/romans) as a collaborator ([how do I do that?](https://help.github.com/en/articles/inviting-collaborators-to-a-personal-repository)).
2. Alternatively, zip the repo and [email it to us](mailto:roman@graphyapp.com).
