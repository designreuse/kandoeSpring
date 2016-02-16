package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.config.BackendContextConfig;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import javax.transaction.Transactional;

import static org.junit.Assert.assertNotNull;

/**
 * Created by Jordan on 16/02/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = BackendContextConfig.class)
@TransactionConfiguration(defaultRollback = true)
@Transactional
public class ThemeServiceTest {

    @Autowired
    private ThemeService themeService;

    //todo delete this
    @Test
    public void testSaveTheme() throws Exception {
/*        themeService.saveTheme(new Theme("KdG"), 1);
        Theme theme = themeService.findTHemeByName("KdG");

        System.out.println(theme.getId());
        System.out.println(theme.getThemeName());
        assertNotNull("The new theme should have an id", theme.getId());
    */}


}
