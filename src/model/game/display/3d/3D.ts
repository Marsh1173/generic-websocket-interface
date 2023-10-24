import {
  BoxGeometry,
  CanvasTexture,
  ConeGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Object3D,
  PlaneGeometry,
  RepeatWrapping,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { StaticPoint } from "../../../common/math/geometry/Point";
import { Resolution, ResolutionDimensions } from "../Resolution";
import { _3DCamera } from "./camera/3DCamera";
import { _3DScene } from "./scene/3DScene";
import { Rect } from "../../../common/math/geometry/Rect";
import { _3DSprite } from "./sprite/3DSprite";
import { GTTextures } from "../../assets/textures/Textures";
import { BaseRenderTexture, RenderTexture, Texture } from "pixi.js";

export interface _3DDisplayConfig {
  res: Resolution;
  camera_center: StaticPoint;
}

export class _3D {
  public readonly camera: _3DCamera;
  public readonly scene: _3DScene;
  protected readonly renderer: WebGLRenderer;

  protected cube: Mesh;
  protected gob: Mesh;

  constructor(config: _3DDisplayConfig) {
    this.camera = new _3DCamera(config);
    this.scene = new _3DScene();

    const res: Rect = ResolutionDimensions[config.res];
    this.renderer = new WebGLRenderer({ alpha: true });
    this.renderer.setSize(res.w, res.h);

    const texture_loader = new TextureLoader();

    const geometry = new BoxGeometry(1, 1);
    const material = new MeshLambertMaterial({ color: 0x00ff00 });
    this.cube = new Mesh(geometry, material);

    const plane_texture = texture_loader.load("./assets/images/ground/grass.png");
    plane_texture.wrapS = plane_texture.wrapT = RepeatWrapping;
    plane_texture.repeat.set(10, 10);
    const plane_geometry = new PlaneGeometry(20, 20);
    const plane_material = new MeshPhongMaterial();
    plane_material.map = plane_texture;
    const plane = new Mesh(plane_geometry, plane_material);
    plane.position.x = this.cube.position.x = 10;
    plane.position.z = this.cube.position.z = 10;
    plane.rotation.x = -Math.PI / 2;

    const texture = texture_loader.load("./assets/images/entity/goblin.png");

    this.gob = new _3DSprite(texture).get_obj();

    this.scene.internal.add(this.cube);
    this.scene.internal.add(plane);
    this.scene.internal.add(this.gob);
  }

  public render() {
    this.camera.update();

    this.gob.position.x = this.camera.internal.position.x;
    this.gob.position.y = 1;
    this.gob.position.z = this.camera.internal.position.z - 30;

    this.renderer.render(this.scene.internal, this.camera.internal);
  }

  public get_dom_elem(): HTMLCanvasElement {
    return this.renderer.domElement;
  }
}
