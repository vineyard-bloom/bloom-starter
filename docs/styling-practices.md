# Styling Best Practices

### Sass
Sass is a pre-processor used to write more sane, maintainable styles. The main distinctions from native CSS are the use of nesting, variables, and the ability to import stylesheets into each other, but there are many more useful features of Sass that can be helpful.

If you've never used Sass, you can see the immediate benefits by fiddling with the `_variables.scss` file (especially colors and font-sizes) and watching the far-reaching effects on your application.

[Sass Basics](https://sass-lang.com/guide)

[Sass Mixins](https://scotch.io/tutorials/how-to-use-sass-mixins)

### SUIT
The SUIT naming convention is similar to BEM-IT, with a block, element, modifier distinction (with utilities & `.is-state` add-ons) but a different syntax.

Comparison:
```
// BEM
.component-name {
  ...
}

.component-name_child {
  ...
}

.component-name_child.is-open {
  ...
}

.component-name_child--variation {
  ...
}
```

vs

```
// SUIT
.ComponentName {
  ...
}

.ComponentName-child {
  ...
}

.ComponentName-child.is-open {
  ...
}

.ComponentName-child--variation {
  ...
}
```

#### Further Reading:
[SUIT Naming Conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)

[SUIT Design Principles](https://github.com/suitcss/suit/blob/master/doc/design-principles.md)

### CSS writing style
Currently, the style used to write CSS makes ample use of nesting to allow for more condensed stylesheets.

This style can take some getting used to.

For comparison:
```
// Native CSS (using SUIT)

.ComponentName {
  ...
}

.ComponentName .ReusableChildComponent { // such as .Header .Dropdown, to add local styles the .Dropdown used everywhere
  ...
}

.ComponentName-childComponent {
  ...
}

.ComponentName-childComponent:focus,
.ComponentName-childComponent:hover {
  ...
}

.ComponentName-childComponent.is-open {
  ...
}
```

vs

```
// Sass with nested style
.ComponentName {
  ...

  .ReusableChildComponent {
    ...
  }

  &-childComponent {
    ...

    &:focus,
    &:hover {
      ...
    }

    &.is-open {
      ...
    }
  }
}
```
