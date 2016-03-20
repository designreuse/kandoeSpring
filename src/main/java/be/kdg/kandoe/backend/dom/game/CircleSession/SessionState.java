package be.kdg.kandoe.backend.dom.game.CircleSession;

/**
 * The state of a session.
 * When the session is CREATED users can choose cards but can't play.
 * When the session is IN_PROGRESS users can't choose cards anymore but they can play.
 * The session is finished when a card reaches the middle of the circle or an organiser stops the session.
 */
public enum SessionState {
    CREATED,
    IN_PROGRESS,
    FINISHED
}
