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
        themeService.saveTheme(theme, 1,1);

        SubTheme subtheme = new SubTheme();
        subtheme.setTheme(theme);
        subtheme.setSubThemeName("KdGSubTheme");
        subtheme.setDescription("kdGSubTheme description");
        subThemeService.saveSubTheme(subtheme,(Integer) 1);

        assertEquals(subtheme.getSubThemeName(),"KdGSubTheme");

    }

    @Test
    public void testUpdateSubTheme() {
        SubTheme subTheme = subThemeService.findSubThemeByName("KdGSubTheme");
        subTheme.setSubThemeName("KdGsubUpdate");
        subThemeService.updateSubTheme(subTheme);
        assertEquals("The SubThemeName should be 'KdGsubUpdate' ",subTheme.getSubThemeName(),"KdGsubUpdate");

    }

}

