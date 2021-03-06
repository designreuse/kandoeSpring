package be.kdg.kandoe.frontend;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ITCreateOrganisation {

    WebDriver driver;

    @Before
    public void setupTest() {
        driver = new ChromeDriver();
    }

    @After
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void testCreateOrganisation() throws InterruptedException {
        driver.get("http://localhost:9966/Kandoe");
        driver.manage().window().maximize();
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
        element = driver.findElement(By.linkText("ORGANISATIONS"));
        element.click();
        (new WebDriverWait(driver, 10)).until((WebDriver d) -> d.findElement(By.tagName("organisations")) != null);
        element = driver.findElement(By.xpath(".//*[@id='org-list']/div/div/ul/div/li/a"));
        element.click();
        (new WebDriverWait(driver, 10)).until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("html/body/my-kandoe/add-organisation/div/form/div[1]/input")));
        element = driver.findElement(By.xpath("html/body/my-kandoe/add-organisation/div/form/div[1]/input"));
        sendKeysPerCharacter(element, "TestOrganisation");
        element = driver.findElement(By.xpath("html/body/my-kandoe/add-organisation/div/form/div[2]/input"));
        sendKeysPerCharacter(element, "TestAddress");
        element = driver.findElement(By.xpath("html/body/my-kandoe/add-organisation/div/form/button"));
        element.click();
        (new WebDriverWait(driver, 10)).until((WebDriver d) -> d.findElement(By.tagName("organisations")) != null);
    }

    private void sendKeysPerCharacter(WebElement element, String keys) {
        for(int i = 0; i < keys.length(); i++){
            element.sendKeys("" + keys.charAt(i));
        }
    }
}
