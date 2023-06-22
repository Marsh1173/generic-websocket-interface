//https://rtouti.github.io/graphics/perlin-noise-algorithm

class Vector2 {
  constructor(public readonly x: number, public readonly y: number) {}

  public dot(other: Vector2) {
    return this.x * other.x + this.y * other.y;
  }
}

export class PerlinNoiseGenerator {
  private static permutation = this.make_permutation();

  private static shuffle(arrayToShuffle: number[]) {
    for (let e = arrayToShuffle.length - 1; e > 0; e--) {
      const index = Math.round(Math.random() * (e - 1));
      const temp = arrayToShuffle[e];

      arrayToShuffle[e] = arrayToShuffle[index];
      arrayToShuffle[index] = temp;
    }
  }

  private static make_permutation() {
    const permutation = [];
    for (let i = 0; i < 256; i++) {
      permutation.push(i);
    }

    this.shuffle(permutation);

    for (let i = 0; i < 256; i++) {
      permutation.push(permutation[i]);
    }

    return permutation;
  }

  private static get_constant_vector(v: number) {
    // v is the value from the permutation table
    const h = v & 3; //3
    if (h == 0) return new Vector2(1.0, 1.0);
    else if (h == 1) return new Vector2(-1.0, 1.0);
    else if (h == 2) return new Vector2(-1.0, -1.0);
    else return new Vector2(1.0, -1.0);
  }

  private static fade(t: number) {
    return ((6 * t - 15) * t + 10) * t * t * t;
  }

  private static lerp(t: number, a1: number, a2: number) {
    return a1 + t * (a2 - a1);
  }

  private static noise_2D(x: number, y: number) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);

    const topRight = new Vector2(xf - 1.0, yf - 1.0);
    const topLeft = new Vector2(xf, yf - 1.0);
    const bottomRight = new Vector2(xf - 1.0, yf);
    const bottomLeft = new Vector2(xf, yf);

    // Select a value from the permutation array for each of the 4 corners
    const valueTopRight = this.permutation[this.permutation[X + 1] + Y + 1];
    const valueTopLeft = this.permutation[this.permutation[X] + Y + 1];
    const valueBottomRight = this.permutation[this.permutation[X + 1] + Y];
    const valueBottomLeft = this.permutation[this.permutation[X] + Y];

    const dotTopRight = topRight.dot(this.get_constant_vector(valueTopRight));
    const dotTopLeft = topLeft.dot(this.get_constant_vector(valueTopLeft));
    const dotBottomRight = bottomRight.dot(this.get_constant_vector(valueBottomRight));
    const dotBottomLeft = bottomLeft.dot(this.get_constant_vector(valueBottomLeft));

    const u = this.fade(xf);
    const v = this.fade(yf);

    return this.lerp(u, this.lerp(v, dotBottomLeft, dotTopLeft), this.lerp(v, dotBottomRight, dotTopRight));
  }

  public static generate_map(width: number, height: number, noise_level: number): number[][] {
    const map: number[][] = Array(width).fill([]);

    for (let x = 0; x < width; x++) {
      map[x] = Array(height).fill(0);
      for (let y = 0; y < height; y++) {
        let n = 0.0,
          a = 1.0,
          f = 0.005;
        for (let o = 0; o < noise_level; o++) {
          n += a * this.noise_2D(x * f, y * f);

          a *= 0.5;
          f *= 2.0;
        }

        n += 1.0;
        n *= 0.5;

        map[x][y] = n;
      }
    }

    this.permutation = this.make_permutation();
    return map;
  }
}
