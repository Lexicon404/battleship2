# battleship2

A very basic battleship game constructed with the aim of learning the subscription/publication model, and State based rendering.

The game was first made in Javascript and later converted into Typescript.

One of the learning objective of this project is to replicate a React-like rendering proccess.

The central aspect of the architecture is the implementation of a pub/sub model that watches for changes in the main Game State object.

The proccess for this is as follow:

All view components are subscribed to the Game State on render.

A proxy is created over the Game State object with a setter. Any changes to the Game State will be published to the subscribed functions by passing the state object as prop.

All view components will receive the state object prop and re-render accordingly.

A major shortfall of this current implementation is that all components will re-render on State change regardless of whether changes to State affects the component's existing DOM.



