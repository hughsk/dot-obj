var trim = require('trim')

module.exports = dotobj

function dotobj(string) {
  var replacement = '/f$1$2$4\n/f$2$3$4'
  string = String(string)
    .replace(/\ \\\r\n/g, '')
    .replace(/f( +\d+)( +\d+)( +\d+)( +\d+)/g, replacement)
    .replace(/f( +\d+\/\d+)( +\d+\/\d+)( +\d+\/\d+)( +\d+\/\d+)/g, replacement)
    .replace(/f( +\d+\/\d+\/\d+)( +\d+\/\d+\/\d+)( +\d+\/\d+\/\d+)( +\d+\/\d+\/\d+)/g, replacement)
    .replace(/f( +\d+\/\/\d+)( +\d+\/\/\d+)( +\d+\/\/\d+)( +\d+\/\/\d+)/g, replacement)

  function vector(arr, x, y, z) {
    return arr.push([parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])])
  }
  function uv(arr, result) {
    return arr.push([parseFloat(result[1]), parseFloat(result[2])])
  }
  function face3(a, b, c, normals) {
    return [a, b, c, normals]
  }
  function createObject() {
    vertinc += vertices ? vertices.length : 0

    var object = {
      positions: vertices = []
      , normals: normals = []
      , uvs: uvs = []
      , cells: faces = []
    }
    objects.push(object)
    return object
  }

  var vertex_pattern = /v( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/
  var normal_pattern = /vn( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/
  var uv_pattern = /vt( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/
  var face_pattern1 = /f( +\d+)( +\d+)( +\d+)/
  var face_pattern2 = /f( +(\d+)\/(\d+))( +(\d+)\/(\d+))( +(\d+)\/(\d+))/
  var face_pattern3 = /f( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))/
  var face_pattern4 = /f( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))/

  var faces, normals, uvs, vertices
  var lines = string.split(/\n/g)
  var objects = []
  var object = createObject()
  var vertinc = 0

  for (var i = 0; i < lines.length; i += 1) {
    var line = trim(lines[i])
    var result

    if (line.length === 0 || line.charAt(0) === '#')
      continue

    if ((result = vertex_pattern.exec(line)) !== null) {
      vector(vertices, result); continue
    }

    if ((result = normal_pattern.exec(line)) !== null) {
      vector(normals, result); continue
    }

    if ((result = uv_pattern.exec(line)) !== null) {
      uv(uvs, result); continue
    }

    if ((result = face_pattern1.exec(line)) !== null) {
      result[1] = parseInt(result[1]) - 1 - vertinc
      result[2] = parseInt(result[2]) - 1 - vertinc
      result[3] = parseInt(result[3]) - 1 - vertinc
      vector(faces, result)
      continue
    }
    if ((result = face_pattern2.exec(line)) !== null) {
      result[1] = parseInt(result[2]) - 1 - vertinc
      result[2] = parseInt(result[5]) - 1 - vertinc
      result[3] = parseInt(result[8]) - 1 - vertinc
      vector(faces, result)
      continue
    }
    if ((result = face_pattern3.exec(line)) !== null) {
      result[1] = parseInt(result[2]) - 1 - vertinc
      result[2] = parseInt(result[6]) - 1 - vertinc
      result[3] = parseInt(result[10]) - 1 - vertinc
      vector(faces, result)
      continue
    }
    if ((result = face_pattern4.exec(line)) !== null) {
      result[1] = parseInt(result[2]) - 1 - vertinc
      result[2] = parseInt(result[5]) - 1 - vertinc
      result[3] = parseInt(result[8]) - 1 - vertinc
      vector(faces, result)
      continue
    }

    if (/^o /.test(line)) {
      object = createObject()
    }
    if (/^g /.test(line)) continue
    if (/^usemtl /.test(line)) continue
    if (/^mtllib /.test(line)) continue
    if (/^s /.test(line)) continue
  }

  return objects.filter(function(obj) {
    return obj.positions.length
  })
}
