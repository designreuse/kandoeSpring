package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.config.BackendContextConfig;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.services.exceptions.ThemeServiceException;
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
    public void testFindThemeById() throws Exception{
        assertNotNull(themeService.findThemeById(1));
    }

    @Test(expected = ThemeServiceException.class)
    public void testFindThemeByWrongId() throws Exception {
        themeService.findThemeById(-1);
    }

    @Test
    public void testSaveTheme() throws Exception {
        Theme toBeSaved = new Theme("KdG");
        toBeSaved.setDescription("Dit is een KDG thema");
        Theme t = themeService.saveTheme(toBeSaved,1,1);

        assertNotNull("The new theme should have an id", t.getId());
        assertEquals(t.getCreator(),userService.findUserById(1));
    }

    @Test(expected = ThemeServiceException.class)
    public void testSaveThemeWithoutDescription() throws Exception {
        Theme t = new Theme();
        themeService.saveTheme(t, 1, 1);
    }

    @Test
    public void testUpdateTheme() throws Exception {
        Theme theme = themeService.findThemeById(1);

        String originalDescription = theme.getDescription();
        theme.setDescription(originalDescription + "testUpdateTheme");
        theme = themeService.updateTheme(theme);
        assertEquals(originalDescription + "testUpdateTheme", theme.getDescription());
    }

    @Test(expected = ThemeServiceException.class)
    public void testUpdateThemeWithNullId() throws Exception {
        Theme t = new Theme();
        themeService.updateTheme(t);
    }

    @Test(expected = ThemeServiceException.class)
    public void testFindThemesByNonExistingCreator() throws Exception {
        themeService.findThemesByCreator(-1);
    }

    @Test(expected = ThemeServiceException.class)
    public void testFindCardsFromNonExistingTheme() throws Exception {
        themeService.findThemesCards(-1);
    }

    @Test(expected = ThemeServiceException.class)
    public void testFindSubthemesFromNonExistingTheme() throws Exception {
        themeService.findThemeSubThemes(-1);
    }
}
