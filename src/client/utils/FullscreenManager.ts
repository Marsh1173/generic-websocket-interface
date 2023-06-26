export abstract class FullscreenManager {
  public static attempt_enter_fullscreen() {
    if (document.fullscreenElement === null) {
      document.documentElement.requestFullscreen();
    }
  }

  public static attempt_leave_fullscreen() {
    if (document.fullscreenElement !== null) {
      document.exitFullscreen();
    }
  }
}
