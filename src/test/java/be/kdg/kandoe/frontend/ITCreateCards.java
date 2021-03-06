package be.kdg.kandoe.frontend;

import io.github.bonigarcia.wdm.ChromeDriverManager;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ITCreateCards {

    WebDriver driver;

    @BeforeClass
    public static void setupClass() {
        ChromeDriverManager.getInstance().setup();
    }

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
    public void testCreateCards() throws InterruptedException {
        driver.get("http://localhost:9966/Kandoe");
        driver.manage().window().maximize();
        (new WebDriverWait(driver, 10)).until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("html/body/my-kandoe/home/section[1]/div[2]/div[1]/button[1]")));
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
        element = driver.findElement(By.linkText("THEMES"));
        element.click();
        (new WebDriverWait(driver, 10)).until((WebDriver d) -> d.findElement(By.tagName("theme")) != null);
        (new WebDriverWait(driver, 10)).until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath(".//*[@id='sort-list']/ul/li[2]/div/div/div[1]/div[1]/a/img")));
        element = driver.findElement(By.xpath(".//*[@id='sort-list']/ul/li[2]/div/div/div[1]/div[1]/a/img"));
        element.click();
        (new WebDriverWait(driver, 10)).until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("html/body/my-kandoe/theme-detail/div[1]/div[6]/div/div/div[2]/span/a[1]")));
        element = driver.findElement(By.xpath("html/body/my-kandoe/theme-detail/div[1]/div[6]/div/div/div[2]/span/a[1]"));
        element.click();
        (new WebDriverWait(driver, 10)).until(ExpectedConditions.visibilityOfElementLocated(By.id("popupcard")));
        element = driver.findElement(By.id("popupcard"));
        sendKeysPerCharacter(element, "Testcard with selenium");
        element = driver.findElement(By.xpath(".//*[@id='add-card']/div/div/div[3]/button"));
        element.click();
    }

    private void sendKeysPerCharacter(WebElement element, String keys) {
        for(int i = 0; i < keys.length(); i++){
            element.sendKeys("" + keys.charAt(i));
        }
    }
}
