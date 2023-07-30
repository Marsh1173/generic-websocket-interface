- load base texture
- make resolution-correct texture on top
  - update on config change?

---

- layers
  - ground (doesn't update - actually does? With shadows)
  - shadow (does update, linked to a renderable)
  - entity (individual and default behavior)
  - indicators (individual and default behavior)
  - text indicators (individual and default behavior)

---

- each frame, renderables will
  - maybe update x, y, z
  - update filters
  - update rig
- renderable classes
  - `fixed_renderable`
  - `movable_renderable`

---

- rig watches entity. Animations are fired by observation
