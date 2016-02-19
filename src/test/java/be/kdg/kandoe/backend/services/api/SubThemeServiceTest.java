package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.config.BackendContextConfig;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.SubTheme;
import be.kdg.kandoe.backend.dom.other.Theme;
import be.kdg.kandoe.backend.persistence.api.ThemeRepository;
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

/**
 * Created by Annelies on 16/02/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = BackendContextConfig.class)
@TransactionConfiguration(defaultRollback = true)
@Transactional
public class SubThemeServiceTest {

    @Autowired
    private SubThemeService subThemeService;
    @Autowired
    private ThemeService themeService;

    //todo delete this
    @Test
    public void testSaveSubTheme() throws Exception {
        Theme theme = new Theme("KdG");
        theme.setDescription("KdGParent description");
        themeService.saveTheme(theme, 1);

        SubTheme subtheme = new SubTheme("KdGsub", themeService.findThemeById(1));
        subtheme.setDescription("kdgSubTheme description");
        subThemeService.saveSubTheme(subtheme, 1);
        SubTheme subTheme = subThemeService.findSubThemeByName("KdGsub");

        assertEquals(theme.getId().toString(),"1");

        subtheme.setThemeName("KdGsubUpdate");
        subThemeService.updateSubTheme(subtheme);
        System.out.println(subTheme);

        System.out.println(subTheme.getId());
        System.out.println(subTheme.getThemeName());
        assertNotNull("The new subthema should have an id", subTheme.getId());

        subThemeService.deleteSubThemeById(2);
        assertEquals("The subtheme should be deleted", themeService.findThemeById(2), null);

    }
}
