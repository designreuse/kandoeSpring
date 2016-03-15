package be.kdg.kandoe.frontend;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ITCreateCards {

    @Test
    public void testCreateCards() throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\Arne\\Documents\\KdG\\3\\Integratieproject 2\\Code\\kandoe\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:9966/Kandoe");
        WebElement element = driver.findElement(By.xpath("html/body/my-kandoe/home/section[1]/div[2]/div[1]/button[1]"));
        element.click();
        element = driver.findElement(By.id("username"));
        sendKeysPerCharacter(element, "ArneLauryssens");
        element = driver.findElement(By.id("password"));
        element.click();
        sendKeysPerCharacter(element, "test123");
        element = driver.findElement(By.xpath(".//*[@id='login-form']/div/button"));
        element.click();
        (new WebDriverWait(driver, 10)).until((WebDriver d) -> d.findElement(By.tagName("loggedin-home")) != null);
        element = driver.findElement(By.xpath(".//*[@id='sort-list']/ul/li[2]/div/div/div[1]/div[2]/div[2]/button"));
        element.click();
        element = driver.findElement(By.xpath(".//*[@id='addcard-btn']"));

    }

    private void sendKeysPerCharacter(WebElement element, String keys) {
        for(int i = 0; i < keys.length(); i++){
            element.sendKeys("" + keys.charAt(i));
        }
    }
}