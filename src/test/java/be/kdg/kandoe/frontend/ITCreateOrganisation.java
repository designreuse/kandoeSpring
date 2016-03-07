package be.kdg.kandoe.frontend;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ITCreateOrganisation {

    @Test
    public void testCreateOrganisation() throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\Arne\\Documents\\KdG\\3\\Integratieproject 2\\Code\\kandoe\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:9966/Kandoe");
        WebElement element = driver.findElement(By.xpath("html/body/my-kandoe/home/section[1]/div[2]/div[1]/button[1]"));
        element.click();
        element = driver.findElement(By.id("username"));
        element.sendKeys("ArneLauryssens");
        element = driver.findElement(By.id("password"));
        element.click();
        element.sendKeys("test123");
        element.sendKeys(Keys.TAB);
        element = driver.findElement(By.xpath(".//*[@id='login-form']/div/button"));
        element.click();
        (new WebDriverWait(driver, 10)).until((WebDriver d) -> d.findElement(By.tagName("loggedin-home")) != null);
        element = driver.findElement(By.linkText("ORGANISATIONS"));
        element.click();
        (new WebDriverWait(driver, 10)).until((WebDriver d) -> d.findElement(By.tagName("organisations")) != null);
        element = driver.findElement(By.xpath(".//*[@id='org-list']/div/div/ul/div/li/a"));
        element.click();
        element = driver.findElement(By.xpath("html/body/my-kandoe/add-organisation/div/form/div[1]/input"));
        element.sendKeys("TestOrganisation");
        element.sendKeys(Keys.TAB);
        element = driver.findElement(By.xpath("html/body/my-kandoe/add-organisation/div/form/div[2]/input"));
        element.sendKeys("TestAddress");
        element.sendKeys(Keys.TAB);
        element = driver.findElement(By.xpath("html/body/my-kandoe/add-organisation/div/form/div[5]/button"));
        element.click();
        (new WebDriverWait(driver, 10)).until((WebDriver d) -> d.findElement(By.tagName("organisations")) != null);
    }
}
