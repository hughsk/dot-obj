# dot-obj [![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

A generic parser for the
[.obj 3D geometry format](http://en.wikipedia.org/wiki/Wavefront_.obj_file).
This has been extracted from [mrdoob](http://github.com/mrdoob)'s
[THREE.OBJLoader](https://github.com/mrdoob/three.js/blob/21515188fd613a71f3d76199b7ae60857f168d25/examples/js/loaders/OBJLoader.js) class.

[![dot-obj](https://nodei.co/npm/dot-obj.png?mini=true)](https://nodei.co/npm/dot-obj)

## Usage ##

### `require('dot-obj')(fileString)` ###

Takes a .obj file as a string and returns an array of objects, each with the
following properties:

* `positions`: the vertex positions for this model.
* `cells`: the faces for this model - i.e. and indexed list of `positions` for
  each face.
* `normals`: a list of vertex normals, if available.
* `uv`: a list of vertex UV coordinates, if available.
