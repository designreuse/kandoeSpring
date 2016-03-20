package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.config.BackendContextConfig;
import be.kdg.kandoe.backend.dom.game.Card;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.junit.Assert.assertArrayEquals;
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
    public void testSaveSubTheme() throws Exception {
       Theme theme=themeService.findThemeById(1);
               SubTheme subtheme = new SubTheme();
        subtheme.setTheme(theme);
        subtheme.setSubThemeName("KdGSubThemetest");
        subtheme.setDescription("kdGSubTheme description");
        subThemeService.saveSubTheme(subtheme,1,1);

        assertEquals(subtheme.getSubThemeName(),"KdGSubThemetest");

    }

    @Test
    public void testUpdateSubTheme() throws Exception{
        SubTheme subTheme = subThemeService.findSubThemeById(1);
        subTheme.setSubThemeName("KdGsubUpdate");

        subThemeService.updateSubTheme(subTheme);
         assertEquals("The SubThemeName should be 'KdGsubUpdate' ",subTheme.getSubThemeName(),"KdGsubUpdate");

    }

    @Test
    public void testSubThemeCards() throws Exception{
        SubTheme subTheme = subThemeService.findSubThemeById(1);

        assertEquals("The length of cards should be 2' ",subTheme.getCards().size(),2);

    }

}

