package be.kdg.kandoe;

import be.kdg.kandoe.backend.config.BackendContextConfig;
import be.kdg.kandoe.backend.dom.game.Card;
import be.kdg.kandoe.backend.services.exceptions.ConvertorException;
import be.kdg.kandoe.backend.services.convertors.CsvToCardConvertor;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import javax.transaction.Transactional;
import java.nio.file.Paths;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

/**
 * Created by amy on 22/02/2016.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = BackendContextConfig.class)
@TransactionConfiguration(defaultRollback = true)
@Transactional
public class CsvConvertorTest {

    @Autowired
    private CsvToCardConvertor csvToCardConvertor;

    @Value("test.csv")
    private String testFile;

    @Value("falseTest.csv")
    private String falseTestFile;

    @Test(expected = ConvertorException.class)
    public void readFileWithoutHeader() throws ConvertorException{
        String fullpath = Paths.get("src", "main", "resources", "excel", falseTestFile).toAbsolutePath().toString();
        csvToCardConvertor.toCards(fullpath);
    }

    @Test
    public void readFile() throws ConvertorException {
        String fullpath = Paths.get("src", "main", "resources", "excel", testFile).toAbsolutePath().toString();
        List<Card> cards = csvToCardConvertor.toCards(fullpath);
        cards.forEach(card -> assertThat(card.getDescription(), notNullValue()));
        assertThat(cards.get(1).getImageURL(), nullValue());
    }



}
