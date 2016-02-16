package be.kdg.kandoe.backend.services.api;

import be.kdg.kandoe.backend.config.BackendContextConfig;
import be.kdg.kandoe.backend.dom.other.Organisation;
import be.kdg.kandoe.backend.dom.other.SubTheme;
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
 * Created by Annelies on 16/02/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = BackendContextConfig.class)
@TransactionConfiguration(defaultRollback = true)
@Transactional
public class SubThemeServiceTest {
/*
    @Autowired
    private SubThemeService subThemeService;

    //todo delete this
    @Test
    public void testSaveSubTheme() throws Exception {
        subThemeService.saveSubTheme(new SubTheme("KdGsub"), new Theme("KDG"));
        SubTheme subTheme = subThemeService.findSubThemeByName("KdGsub");

        System.out.println(subTheme.getId());
        System.out.println(subTheme.getOrganisationName());
        assertNotNull("The new subthema should have an id", subTheme.getId());
    }*/
}
