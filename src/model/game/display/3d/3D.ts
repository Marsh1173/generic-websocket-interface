import { Mesh, MeshLambertMaterial, Object3D, PlaneGeometry, SphereGeometry, WebGLRenderer } from "three";
import { StaticPoint } from "../../../common/math/geometry/Point";
import { Resolution, ResolutionDimensions } from "../Resolution";
import { _3DCamera } from "./camera/3DCamera";
import { _3DScene } from "./scene/3DScene";
import { Rect } from "../../../common/math/geometry/Rect";
import { _3DSprite } from "./sprite/3DSprite";
import { GTModels } from "../../assets/models/Models";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";

export interface _3DDisplayConfig {
  res: Resolution;
  camera_center: StaticPoint;
}

export class _3D {
  public readonly camera: _3DCamera;
  public readonly scene: _3DScene;
  protected readonly renderer: WebGLRenderer;

  constructor(private readonly config: _3DDisplayConfig, game_system: LocalGameSystem) {
    Object3D.DEFAULT_UP.set(0, 0, 1);
    this.camera = new _3DCamera(this.config);
    this.scene = new _3DScene(game_system);

    const res: Rect = ResolutionDimensions[this.config.res];
    this.renderer = new WebGLRenderer({ alpha: false, antialias: false, powerPreference: "high-performance" });
    this.renderer.setSize(res.w, res.h);

    const pillar_geometry = GTModels.get("pillar");
    pillar_geometry.scale.set(0.1, 0.1, 0.1);
    pillar_geometry.position.set(8, 8, 0);
    this.scene.internal.add(pillar_geometry);

    const rock_geometry = GTModels.get("rock_1");
    rock_geometry.scale.set(3, 3, 3);
    rock_geometry.position.set(2, 2, 0);
    this.scene.internal.add(rock_geometry);

    // const plane_geometry = new PlaneGeometry(30, 30);
    // const plane_material = new MeshLambertMaterial({ color: 0x798b4d });
    // const plane = new Mesh(plane_geometry, plane_material);
    // plane.position.x = 15;
    // plane.position.y = 15;
    // this.scene.internal.add(plane);
  }

  public render(elapsed_seconds: number) {
    this.scene.update(elapsed_seconds);
    this.renderer.render(this.scene.internal, this.camera.internal);
  }

  public get_dom_elem(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  public destroy() {
    this.renderer.renderLists.dispose();
  }
}
