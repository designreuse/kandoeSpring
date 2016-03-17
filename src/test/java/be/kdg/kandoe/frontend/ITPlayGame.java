package be.kdg.kandoe.frontend;

import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class ITPlayGame {

    @Test
    public void testPlayGame() throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:9966/Kandoe");
        driver.manage().window().maximize();
    }

    private void sendKeysPerCharacter(WebElement element, String keys) {
        for(int i = 0; i < keys.length(); i++){
            element.sendKeys("" + keys.charAt(i));
        }
    }
}
