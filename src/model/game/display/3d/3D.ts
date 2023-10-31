import {
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Object3D,
  PlaneGeometry,
  RepeatWrapping,
  SphereGeometry,
  WebGLRenderer,
} from "three";
import { StaticPoint } from "../../../common/math/geometry/Point";
import { Resolution, ResolutionDimensions } from "../Resolution";
import { _3DCamera } from "./camera/3DCamera";
import { _3DScene } from "./scene/3DScene";
import { Rect } from "../../../common/math/geometry/Rect";
import { _3DSprite } from "./sprite/3DSprite";
import { GTTextures } from "../../assets/textures/Textures";

export interface _3DDisplayConfig {
  res: Resolution;
  camera_center: StaticPoint;
}

export class _3D {
  public readonly camera: _3DCamera;
  public readonly scene: _3DScene;
  protected readonly renderer: WebGLRenderer;

  protected sphere: Mesh;

  constructor(private readonly config: _3DDisplayConfig) {
    Object3D.DEFAULT_UP.set(0, 0, 1);
    this.camera = new _3DCamera(this.config);
    this.scene = new _3DScene();

    const res: Rect = ResolutionDimensions[this.config.res];
    this.renderer = new WebGLRenderer({ alpha: true });
    this.renderer.setSize(res.w, res.h);

    const geometry = new SphereGeometry(1);
    const material = new MeshLambertMaterial({ color: 0xffffff });
    this.sphere = new Mesh(geometry, material);
    this.sphere.position.x = 3;
    this.sphere.position.y = 3;
    this.sphere.position.z = 2;

    const plane_texture = GTTextures.get_threejs("ground-grass");
    plane_texture.wrapS = plane_texture.wrapT = RepeatWrapping;
    plane_texture.repeat.set(10, 10);

    const plane_geometry = new PlaneGeometry(20, 20);
    const plane_material = new MeshPhongMaterial();
    plane_material.map = plane_texture;

    const plane = new Mesh(plane_geometry, plane_material);
    plane.position.x = 10;
    plane.position.y = 10;

    this.scene.internal.add(this.sphere);
    this.scene.internal.add(plane);
  }

  public render() {
    this.camera.update();
    this.renderer.render(this.scene.internal, this.camera.internal);
  }

  public get_dom_elem(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  public destroy() {
    this.renderer.renderLists.dispose();
  }
}
