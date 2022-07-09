export interface PhysicsEngineInterface {
    update: (elapsed_time: number) => void;
}

export abstract class PhysicsEngine implements PhysicsEngineInterface {

    public update(elapsed_time: number) {
        
    };
}