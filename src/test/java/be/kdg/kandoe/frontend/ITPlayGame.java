package be.kdg.kandoe.frontend;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ITPlayGame {

    WebDriver driver = new ChromeDriver();
    WebElement element;

    @Test
    public void testPlayGame() throws InterruptedException {
        /*driver.get("http://localhost:9966/Kandoe");
        driver.manage().window().maximize();
        login("ArneLauryssens", "test123");
        element = driver.findElement(By.partialLinkText("Create new kandoe"));
        element.click();
        element = driver.findElement(By.id("name"));
        sendKeysPerCharacter("Selenium session");
        Select dropdown = new Select(driver.findElement(By.xpath("html/body/my-kandoe/add-session/div/form/div[2]/select")));
        dropdown.selectByIndex(1);*/

    }

    private void login(String username, String password){
        element = driver.findElement(By.xpath("html/body/my-kandoe/home/section[1]/div[2]/div[1]/button[1]"));
        element.click();
        element = driver.findElement(By.id("username"));
        sendKeysPerCharacter(username);
        element = driver.findElement(By.id("password"));
        element.click();
        sendKeysPerCharacter(password);
        element = driver.findElement(By.xpath("./*//*[@id='login-form']/div/button"));
        element.click();
        (new WebDriverWait(driver, 10)).until((WebDriver d) -> d.findElement(By.tagName("loggedin-home")) != null);
    }

    private void sendKeysPerCharacter(String keys) {
        for(int i = 0; i < keys.length(); i++){
            element.sendKeys("" + keys.charAt(i));
        }
    }
}
