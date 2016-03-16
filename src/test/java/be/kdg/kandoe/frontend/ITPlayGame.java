package be.kdg.kandoe.frontend;

import org.junit.Test;
import org.openqa.selenium.WebElement;

public class ITPlayGame {

    @Test
    public void testPlayGame() throws InterruptedException {

    }

    private void sendKeysPerCharacter(WebElement element, String keys) {
        for(int i = 0; i < keys.length(); i++){
            element.sendKeys("" + keys.charAt(i));
        }
    }
}
