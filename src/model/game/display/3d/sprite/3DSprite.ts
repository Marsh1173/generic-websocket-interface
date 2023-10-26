import { Mesh, MeshBasicMaterial, PlaneGeometry, Texture } from "three";

export class _3DSprite {
  protected readonly plane: Mesh;
  constructor(texture: Texture) {
    const plane_geometry = new PlaneGeometry(1, 2);
    const plane_material = new MeshBasicMaterial();
    plane_material.map = texture;
    plane_material.transparent = true;
    this.plane = new Mesh(plane_geometry, plane_material);
    this.plane.rotation.x = Math.PI / 2;
  }

  public get_obj() {
    return this.plane;
  }
}
