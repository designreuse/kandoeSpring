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

import static org.junit.Assert.*;
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
    @Autowired
    private UserService userService;

    @Test
    public void testSaveTheme() throws Exception {
        Theme toBeSaved = new Theme("KdG");
        toBeSaved.setDescription("Dit is een KDG thema");
        int sizeBefore = themeService.findThemes().size();
        Theme t = themeService.saveTheme(toBeSaved,1,1);
        assertEquals(themeService.findThemes().size(),sizeBefore + 1);
        Theme theme = themeService.findThemeByName("KdG");

        assertNotNull("The new theme should have an id", theme.getId());
        assertEquals(theme.getCreator(),userService.findUserById(1));

        Theme updatedTheme = theme;
        updatedTheme.setDescription("Updated description");
        themeService.updateTheme(updatedTheme);
        assertEquals(updatedTheme.getDescription(),"Updated description");

        int themeId=updatedTheme.getId();

        sizeBefore = themeService.findThemes().size();
        themeService.removeTheme(themeId);
        assertNull(themeService.findThemeById(themeId));

        assertEquals(sizeBefore-1,themeService.findThemes().size());
    }
}
