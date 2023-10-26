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
  //   protected gob: Mesh;

  constructor(private readonly config: _3DDisplayConfig) {
    Object3D.DEFAULT_UP.set(0, 0, 1);
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
    plane.position.y = this.cube.position.y = 10;

    const texture = texture_loader.load(GTTextures.get("entity-goblin").baseTexture.resource.src);

    // this.gob = new _3DSprite(texture).get_obj();

    this.scene.internal.add(this.cube);
    this.scene.internal.add(plane);
    // this.scene.internal.add(this.gob);
  }

  public render() {
    this.camera.update();

    // this.gob.position.x = this.config.camera_center.x;
    // this.gob.position.y = this.config.camera_center.y;
    // this.gob.position.z = 1;

    this.renderer.render(this.scene.internal, this.camera.internal);
  }

  public get_dom_elem(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  public destroy() {
    this.renderer.renderLists.dispose();
  }
}
