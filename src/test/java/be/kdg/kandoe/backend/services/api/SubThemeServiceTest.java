package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.config.BackendContextConfig;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.persistence.api.ThemeRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import javax.transaction.Transactional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

/*@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = BackendContextConfig.class)
@TransactionConfiguration(defaultRollback = true)
@Transactional
public class SubThemeServiceTest {

    @Autowired
    private SubThemeService subThemeService;
    @Autowired
    private ThemeService themeService;


   @Test
    public void testSaveSubTheme() throws Exception {
        /*Theme theme = new Theme("KdG");
        theme.setDescription("KdGParent description");
        themeService.saveTheme(theme, 1);

        SubTheme subtheme = new SubTheme("KdGsub", themeService.findThemeById(1));
        subtheme.setDescription("kdgSubTheme description");
        subThemeService.saveSubTheme(subtheme, 1);
        SubTheme subTheme = subThemeService.findSubThemeByName("KdGsub");

        assertEquals(theme.getThemeName(),"KdG");

        subtheme.setThemeName("KdGsubUpdate");
        subThemeService.updateSubTheme(subtheme);
        System.out.println(subTheme);

        System.out.println(subTheme.getId());
        System.out.println(subTheme.getThemeName());
       assertNotNull("The new subthema should have an id", subTheme.getId());

        subThemeService.deleteSubThemeById(2);
        assertEquals("The subtheme should be deleted", themeService.findThemeById(2), null);       */

    }
}*/

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = BackendContextConfig.class)
@TransactionConfiguration(defaultRollback = true)
@Transactional
public class SubThemeServiceTest {

    @Autowired
    private SubThemeService subThemeService;
    @Autowired
    private ThemeService themeService;

    @Test
    @Before
    public void testSaveSubTheme() throws Exception {
        Theme theme = new Theme("KdG");
        theme.setDescription("KdGParent description");
        themeService.saveTheme(theme, 1);

        SubTheme subtheme = new SubTheme("KdGsub", themeService.findThemeById(1));
        subtheme.setDescription("kdgSubTheme description");
        subThemeService.saveSubTheme(subtheme, 1);

        assertEquals(subtheme.getThemeName(),"KdGsub");

    }

    @Test
    public void testUpdateSubTheme() {
        SubTheme subTheme = subThemeService.findSubThemeByName("KdGsub");
        subTheme.setThemeName("KdGsubUpdate");
        subThemeService.updateSubTheme(subTheme);

        assertEquals("The SubThemeName should be 'KdGsubUpdate' ",subTheme.getThemeName(),"KdGsubUpdate");

    }

}

