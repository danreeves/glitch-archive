# React Carousel Demo

Features on display:
 - Using Styled Components for dynamic styles based on state
 - Using a React component to manage state for it's children (a HOC)

## `Carousel`

`Carousel` is a React component which creates a sliding carousel from the images you pass to it as children.

It has `initialWidth` and `initialHeight` props used to define how big it should be before it's in the browser (and images have loaded or the screen has a size).

Usage:

```
  <Carousel initialHeight={400} initialWidth={600}>
    <img src="https://unsplash.it/600/400/?image=110" />
    <img src="https://unsplash.it/600/400/?image=220" />
    <img src="https://unsplash.it/600/400/?image=330" />
    <img src="https://unsplash.it/600/400/?image=440" />
    <img src="https://unsplash.it/600/400/?image=550" />
  </Carousel>
```

See `src/carousel.js` to see how it works.

### Missing features

1. It's currently not responsive. This could be added in JS with an onResize handler or probably with some smarter CSS.
2. Touch controls! 👉📱
3. If the images aren't the same size as the Carousel then they get squashed/stretched. They should maintain their aspect ratio.
4. It might be nice if the Carousel is automatically resized when the images load. We want an initialHeight/Width so that our server rendered CSS and initial paint has decent blocking but we can't always know the size of images being used.

---

Made by [@dnrvs](https://twitter.com/dnrvs)

Have a nice day🌤
